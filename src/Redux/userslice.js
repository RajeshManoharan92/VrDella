import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const URL = "https://62053f31161670001741b6db.mockapi.io/CRUD";

// Read

export const fetchTodos = createAsyncThunk("todos/fetchAllTodos", async () => {
    try {
        const response = await axios.get(URL);
        if (response.data.length > 0) {
            return response.data;
        } else {
            return [];
        }
    } catch (error) {
        return error.message;
    }
})

// Create 

export const PostTodos = createAsyncThunk("todos/PostTodos", async (data) => {
    try {
        const response = await axios.post(URL, {
            pass: data.pass,
            fail: data.fail,
            department: data.department
        })
        if (response) {
            return response.data;
        } else {
            return [];
        }
    } catch (error) {
        return error.message;
    }
})

// Update

export const PutTodos = createAsyncThunk("todos/PutTodos", async (data) => {

    try {
        const response = await axios.put(`${URL}/${data.id}`, {
            pass: data.pass,
            fail: data.fail,
            department: data.department
        })
        if (response) {
            return response.data;
        } else {
            return [];
        }
    } catch (error) {
        return error.message;
    }
})

// Delete

export const DeleteTodos = createAsyncThunk("todos/DeleteTodos", async (data) => {

    try {
        const response = await axios.delete(`${URL}/${data.id}`)
        if (response) {
            return response.data;
        } else {
            return [];
        }
    } catch (error) {
        return error.message;
    }
})

// User Slice and Reducers

export const userSlice = createSlice({
    name: "user",

    initialState: {
        product: [],
        status:""
    },

    reducers: {
        product: (state, action) => {
            state.product = action.payload
        },
    },
    extraReducers(builders) {

        // Read

        builders.addCase(fetchTodos.pending, (state, action) => {
            state.status = "loading";
        });
        builders.addCase(fetchTodos.fulfilled, (state, action) => {
            state.status = "success";
            state.product = state.product.concat(action.payload);

        });
        builders.addCase(fetchTodos.rejected, (state, action) => {
            state.status = "failed";
            console.log(action.error);
        });

        // Post

        builders.addCase(PostTodos.pending, (state, action) => {
            state.status = "loading";
        });
        builders.addCase(PostTodos.fulfilled, (state, action) => {
            state.status = "success";
            state.product = [...state.product, action.payload];
            toast.success("Student Details created", { position: "top-center" })
        });
        builders.addCase(PostTodos.rejected, (state, action) => {
            state.status = "failed";
            console.log(action.error);
        });

        // Update

        builders.addCase(PutTodos.pending, (state, action) => {
            state.status = "loading";
        });
        builders.addCase(PutTodos.fulfilled, (state, action) => {
            console.log(action.payload)
            state.status = "success";
            var index = state.product.findIndex((row) => row.id == action.payload.id)
            var Product = [...state.product]
            Product[index] = action.payload;
            state.product = Product;
            toast.success("Updated successfully", { position: "top-center" })
        });
        builders.addCase(PutTodos.rejected, (state, action) => {
            state.status = "failed";
            console.log(action.error);
        });

        // Delete

        builders.addCase(DeleteTodos.pending, (state, action) => {
            state.status = "loading";
        });
        builders.addCase(DeleteTodos.fulfilled, (state, action) => {
            console.log(action.payload)
            state.status = "success";
            var del = state.product.filter((row) => row.id !== action.payload.id)
            state.product = del;
            toast.success("Deleted successfully", { position: "top-center" })
        });
        builders.addCase(DeleteTodos.rejected, (state, action) => {
            state.status = "failed";
            console.log(action.error);
        });
    },

})

export const { product } = userSlice.actions;
export const selectedProduct = (state) => state.user.product;
export default userSlice.reducer;