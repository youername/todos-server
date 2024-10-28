import { Request, Response } from "express";
import { Todo } from "../entities/todo";
import { User } from "../entities/user";

const createTodo = async (req: Request, res: Response) => {
  const { title, isDone } = req.body;
  try {
    // const todo = Todo.create({title,isDone})
    const user = await User.findOne({ where: { id: req.user?.id } });
    const todo = new Todo();
    todo.title = title;
    todo.isDone = isDone;
    if (user) {
      todo.user = user;
    }

    await todo.save();

    res.status(200).json({ message: "todocreated successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error });
  }
};

const getTodos = async (req: Request, res: Response) => {
  try {
    // const todo = Todo.create({title,isDone})
    const user = await User.findOne({ where: { id: req.user?.id } });

    if (!user) {
      throw res.status(500).json({ message: "Not found user" });
    }
    const todos = await Todo.findBy({ user });

    res.status(200).json({ message: "todocreated successfully", todos });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

const updateTodo = async (req: Request, res: Response) => {
  const { id, title, subTitle, atDate, isDone, color } = req.body;

  try {
    const user = await User.findOneBy({ id: req.user?.id });
    if (!user) {
      throw res.status(400).json({ message: "Not found user" });
    }

    const todo = await Todo.findOneBy({ id: id, user: user });

    if (!todo) {
      throw res.status(400).json({ message: "Not found todo" });
    }
    //                          todo 클래스에서 일부만 활용
    const updateFields: Partial<Todo> = {};

    if ((req.body, title !== undefined)) {
      updateFields.title = req.body.title;
    }

    if ((req.body, subTitle !== undefined)) {
      updateFields.subTitle = req.body.subTitle;
    }

    if ((req.body, atDate !== undefined)) {
      updateFields.atDate = req.body.atDate;
    }

    if ((req.body, isDone !== undefined)) {
      updateFields.isDone = req.body.isDone;
    }

    if ((req.body, color !== undefined)) {
      updateFields.color = req.body.color;
    }
    //  {title:"asdfasfd",subtitle:"asdf"}

    await Todo.update({ id }, updateFields);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

const updateIsDone = async (req: Request, res: Response) => {
  const { id, isDone } = req.body;

  try {
    const user = await User.findOneBy({ id: req.user?.id });

    if (!user) {
      throw res.status(400).json({ message: "Not found user" });
    }

    const todo = await Todo.findOneBy({ id: id, user: user });

    if (!todo) {
      throw res
        .status(400)
        .json({ message: "Not found todo or don't have permission" });
    }

    await Todo.update({ id }, { isDone });

    res.status(200);
    res.json({ message: "Update is'done fo todo successfully", todo });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

const removeTodo = async (req: Request, res: Response) => {};

export { createTodo, updateTodo, removeTodo, getTodos, updateIsDone };
