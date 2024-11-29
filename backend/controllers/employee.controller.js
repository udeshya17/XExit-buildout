const employeeLogics = require('../services/employee.service.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Employee = require('../models/employee.model.js');
const ResignInfo = require('../models/resign.model.js');

const allEmployeeLogics = new employeeLogics();

// Controller for user registration
const registerNewUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        
        // Check if user already exists
        const existingUser = await allEmployeeLogics.getUserByName(username);
        if (existingUser) {
            return res.status(400).send({ message: 'User already exists' });
        }
        
        // Register the new user
        const newUser = await allEmployeeLogics.registerUser({ username, password, email });
        return res.status(201).send({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
};

// Controller for user login
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user exists
        const user = await allEmployeeLogics.getUserByName(username);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Validate password
        const isPasswordValid = await allEmployeeLogics.validatePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Invalid password' });
        }

        // Generate JWT token
        const token = allEmployeeLogics.createToken({ id: user._id, username: user.username });

        return res.status(200).send({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
};

// Controller for handling user resignation
const newUserResign = async (req, res) => {
    try {
        const { lwd, reason } = req.body;
        const empId = req.user.id;

        // Create a resignation entry
        const resignData = {
            empId,
            lwd,
            reason,
            status: 'Pending',
        };

        const newResignation = await allEmployeeLogics.addResignOfEmployee(resignData);
        return res.status(201).send({ message: 'Resignation submitted successfully', resignation: newResignation });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
};

// Controller for deleting a resignation (if needed)
const deleteResign = async (req, res) => {
    try {
        const empId = req.user.id;

        // Delete the resignation entry
        const deletedResignation = await allEmployeeLogics.deleteResignData(empId);
        if (!deletedResignation) {
            return res.status(404).send({ message: 'No resignation found to delete' });
        }

        return res.status(200).send({ message: 'Resignation deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
};

module.exports = {
    registerNewUser,
    loginUser,
    newUserResign,
    deleteResign,
};
