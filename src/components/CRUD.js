import React, {useEffect, useState } from 'react'
import { Formik } from "formik"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { product, PostTodos } from '../Redux/userslice';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from 'react-router-dom';

export const CRUD = () => {

    // dispatch function to dispatch data to redux store

    const dispatch = useDispatch()

    // useNavigate function to navigate through components

    const Navigate = useNavigate()

     // useEffect used to clear history to avoid browser back button

     useEffect(() => {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event) {
            window.history.pushState(null, document.title, window.location.href);
        })
    }, []);

    // formik initial values

    const [formvalue, setformvalue] = useState({
        pass: "",
        fail: "",
        department: ""
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
        await dispatch(PostTodos({
            pass: formData.pass,
            fail: formData.fail,
            department: formData.department,
        })).then(() => {
            setformvalue({ pass: "", fail: "", department: "" })
        }).catch((err) => {
                toast.error(err.response.data)
            })
    }

    // To remove datas in array to avoid multiple loading

    const Removedatas = () => {
        dispatch(product([]))
        Navigate("/")
    }

    return (
        <div class="container">

            {/* Dashboard Button */}

            <div class="row mt-5 justify-content-lg-end  justify-content-md-end justify-content-start">
                <div class="col-3 ">
                    <button class="btn btn-primary" onClick={() => Removedatas()}>Go To Dashboard</button>
                </div>
            </div>

            {/* Card to add Data */}

            <div class="row mt-5">
                <div class="col">
                    <div class="row" >
                        <div class="card" >
                            <div class="card-body">
                                <h5 class="card-title">Exam Results 2022</h5>
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
                                                        Post
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
            </div>
            <ToastContainer />
        </div>
    )
}
