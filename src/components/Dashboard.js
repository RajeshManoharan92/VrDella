import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { Formik } from "formik"
import { FaEdit, FaRegCalendarTimes } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from "react-router-dom"
import { selectedProduct, fetchTodos, PutTodos, DeleteTodos } from '../Redux/userslice';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register( CategoryScale, LinearScale, BarElement, Title,Tooltip, Legend);

export const Dashboard = () => {

    // useNavigate function to navigate through components

    const Navigate = useNavigate()

    // To make useeffect to execute only once on page load

    const shouldlog = useRef(true)

    // To create loading symbol till data fetched from backend

    const [loading, setloading] = useState(true)

    // To get data from redux store

    const array = useSelector(selectedProduct)

    // To dispatch data to redux store

    const dispatch = useDispatch()

    // To make update card populate on clicking edit button

    const [card, setcard] = useState(false)

    // useEffect to get data on pageload and to store the data in redux-store

    useEffect(() => {
        if (shouldlog.current) {
            shouldlog.current = false
            dispatch(fetchTodos())
            setloading(false)
        }
    }, [])

    // Arrays to get data from store and used for chart datas

    var passdata = [];
    var faildata = [];
    var deptdata = [];

    array?.map((ele) => (
        passdata.push(ele.pass),
        faildata.push(ele.fail),
        deptdata.push(ele.department)
    ))

    // formik initial values

    const [formvalue, setformvalue] = useState({
        pass: "",
        fail: "",
        department: "",
        id: ""
    })

    // formik errors

    const validate = (formData) => {
        var errors = {};
        if (formData.pass == '') errors.pass = 'No of students pass is Required';
        if (formData.fail == '') errors.fail = 'No of students failed is Required';
        if (formData.department == '') errors.department = 'Department is Required';
        return errors;
    };

    // onsubmit function

    const onSubmit = async (formData) => {
        dispatch(PutTodos({
            pass: formData.pass,
            fail: formData.fail,
            department: formData.department,
            id: formvalue.id
        })).then(() => {
            setcard(false)
            setformvalue({ department: "", pass: "", fail: "" })
        }).catch((err) => {
                toast.error(err.response.data)
            })
    }

    // function to populate selected data in formvalue on cliking edit button

    const update = async (id) => {
        setcard(true)
        var selecteddata = array.filter((row) => row.id == id)[0];
        await setformvalue({
            department: selecteddata.department,
            pass: selecteddata.pass,
            fail: selecteddata.fail,
            id: selecteddata.id,
        })
    }

    // function to delete data from table

    const Delete = async (id) => {
        dispatch(DeleteTodos({
            id: id
        })).catch((err) => {
                toast.error(err.response.data)
            })
    }

    // Chart Datas

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Exam Results -2022',
            },
        },
    };

    const labels = deptdata;

    const data = {
        labels,
        datasets: [
            {
                label: 'Pass',
                data: passdata,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Fail',
                data: faildata,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <>
            <section>
                {
                    // loading till data fetched from backend

                    loading ? <>
                        <div>
                            ....loading
                        </div>
                    </> : <>

                        {/* card section */}

                        <div class="container">
                            <div class="row mt-4">
                                {
                                    array?.map((ele, i) => {
                                        return (
                                            <div key={i} class="col-lg-3 col-md-6 col-sm-12 col-12 m mt-lg-4 mt-sm-3 mt-md-3 mt-3 mx-auto ">
                                                <div class="card cardcolor"  style={{ "width": "18rem" }}>
                                                    <div  class="card-body">
                                                        <h5 class="card-title">{ele.department}</h5>
                                                        <p class="card-text">No of Students Passed - {ele.pass}</p>
                                                        <p class="card-text">No of Students Failed - {ele.fail}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            {/* Bar chart */}

                            <div class="row mt-5">
                                <div class=" mx-auto chartcolor">
                                    <Bar options={options} data={data} />
                                </div>
                            </div>

                            {/* Update card */}

                            {
                                card ? <>

                                    <div class="row mt-5 mb-5">
                                        <div class="col mx-auto">


                                            <div class="card" >
                                                <div class="card-body">
                                                    <h5 class="card-title">Edit Data</h5>
                                                    <Formik
                                                        enableReinitialize
                                                        initialValues={formvalue}
                                                        validate={(formData) => validate(formData)}
                                                        onSubmit={(formData) => onSubmit(formData)}
                                                    >
                                                        {({
                                                            values,
                                                            errors,
                                                            touched,
                                                            handleChange,
                                                            handleBlur,
                                                            handleSubmit,
                                                            isSubmitting,
                                                        }) => (
                                                            <form onSubmit={handleSubmit}>

                                                                {/* Department Input */}

                                                                <div class="row mt-4 rowht ">
                                                                    <div class="col-lg-12 col-md-12 col-sm-12 text-center  align-self-center  ">
                                                                        <InputGroup className="mb-3">
                                                                            <InputGroup.Text id="basic-addon1"
                                                                            >Department</InputGroup.Text>
                                                                            <Form.Control
                                                                                placeholder="Enter Department"
                                                                                aria-label="Username"
                                                                                aria-describedby="basic-addon1"
                                                                                type="text"
                                                                                name="department"
                                                                                onChange={handleChange}
                                                                                onBlur={handleBlur}
                                                                                value={values.department}
                                                                            />
                                                                        </InputGroup>
                                                                    </div>
                                                                </div>
                                                                <div class="row  errorrowht">
                                                                    <div class=" col-12 text-center     ">
                                                                        <div className="errors text-center">{errors.department && touched.department && errors.department}</div>
                                                                    </div>
                                                                </div>

                                                                {/* Number Of Students Passed Input */}

                                                                <div class="row mt-4 rowht ">
                                                                    <div class="col-lg-12 col-md-12 col-sm-12 text-center  align-self-center  ">
                                                                        <InputGroup className="mb-3">
                                                                            <InputGroup.Text id="basic-addon1"
                                                                            >Number Of Students Passed</InputGroup.Text>
                                                                            <Form.Control
                                                                                placeholder="Enter Your Number"
                                                                                aria-label="Username"
                                                                                aria-describedby="basic-addon1"
                                                                                type="number"
                                                                                name="pass"
                                                                                onChange={handleChange}
                                                                                onBlur={handleBlur}
                                                                                value={values.pass}
                                                                            />
                                                                        </InputGroup>
                                                                    </div>
                                                                </div>
                                                                <div class="row  errorrowht">
                                                                    <div class=" col-12 text-center     ">
                                                                        <div className="errors text-center">{errors.pass && touched.pass && errors.pass}</div>
                                                                    </div>
                                                                </div>

                                                                {/* Number Of Students failed Input */}

                                                                <div class="row mt-4 rowht ">
                                                                    <div class="col-lg-12 col-md-12 col-sm-12 text-center  align-self-center  ">
                                                                        <InputGroup className="mb-3">
                                                                            <InputGroup.Text id="basic-addon1"
                                                                            >Number Of Students Failed</InputGroup.Text>
                                                                            <Form.Control
                                                                                placeholder="Enter Your Number"
                                                                                aria-label="Username"
                                                                                aria-describedby="basic-addon1"
                                                                                type="number"
                                                                                name="fail"
                                                                                onChange={handleChange}
                                                                                onBlur={handleBlur}
                                                                                value={values.fail}
                                                                            />
                                                                        </InputGroup>
                                                                    </div>
                                                                </div>
                                                                <div class="row  errorrowht">
                                                                    <div class=" col-12 text-center     ">
                                                                        <div className="errors text-center">{errors.fail && touched.fail && errors.fail}</div>
                                                                    </div>
                                                                </div>

                                                                {/* Post Button */}

                                                                <div class="row mt-3">
                                                                    <div class="col-lg-12 col-md-12 col-sm-12 text-center mb-4 mt-3 mt-lg-0 mt-md-0 mt-sm-3  text-lg-center text-md-center text-sm-center">
                                                                        <button class="btn btn-success" type="submit" disabled={isSubmitting}>
                                                                            Update
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        )}
                                                    </Formik>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </> : <>

                                    {/* table */}

                                    <div class="row  mt-5">
                                        <div class="col mx-auto">
                                            <table class="table table-striped table-responsive table-bordered chartcolor" >
                                                <thead >
                                                    <tr>
                                                        <th>Department</th>
                                                        <th>Number Of Students Passed</th>
                                                        <th>Number Of Students Failed</th>
                                                        <th colSpan="2">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        array?.map((row, i) => (
                                                            <tr key={i}>
                                                                <td>{row.department}</td>
                                                                <td>{row.pass}</td>
                                                                <td>{row.fail}</td>

                                                                <td><button class="btn btn-secondary" onClick={() => update(row.id)}><FaEdit /></button> </td>
                                                                <td><button class="btn btn-danger" onClick={() => Delete(row.id)}><FaRegCalendarTimes /></button></td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>

                                            {/* Add data button */}

                                            <div class="row mt-2 mb-5" >
                                                <div class="col-5 mx-auto">
                                                    <button class="btn btn-outline-primary" onClick={() => Navigate("/crud")}>+ Add Data</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }
                            <ToastContainer />
                        </div>
                    </>
                }
            </section>
        </>
    )
}
