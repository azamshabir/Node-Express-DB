const Task = require("../models/Task");
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../error/custom-error')

/*
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ status:'success', data : {tasks, records: tasks.length}});
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
*/

const getAllTasks =  asyncWrapper ( async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({ status:'success', data : {tasks, records: tasks.length}});
});

/*
const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });

    if (!task) {
      return res.status(404).json({ msg: `No task with Id : ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
*/

const getTask = asyncWrapper ( async (req, res, next) => {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });

    if (!task) {
      /*const error = new Error('Not Found');
      error.status = 404;
      return next(error) */
      return next(createCustomError(`No task with Id : ${taskID}`, 404))
      //return res.status(404).json({ msg: `No task with Id : ${taskID}` });
    }
    res.status(200).json({ task });
}) ;

/*
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    console.log(task);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
*/

const createTask = asyncWrapper( async (req, res) => {
  try {
    const task = await Task.create(req.body);
    console.log(task);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

/*
const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({ msg: `No task with Id : ${taskID}` });
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
*/

const updateTask =  asyncWrapper( async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({ msg: `No task with Id : ${taskID}` });
    }
    res.status(200).json({ task });
});

/*
const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      return res.status(404).json({ msg: `No task with Id : ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
*/

const deleteTask = asyncWrapper ( async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      return res.status(404).json({ msg: `No task with Id : ${taskID}` });
    }
    res.status(200).json({ task });
});

const editTask = asyncWrapper ( async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
      overwrite: true,
    });

    if (!task) {
      return res.status(404).json({ msg: `No task with Id : ${taskID}` });
    }

    res.status(200).json({ task });
});

/*
const editTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
      overwrite: true,
    });

    if (!task) {
      return res.status(404).json({ msg: `No task with Id : ${taskID}` });
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
*/

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  editTask,
};
