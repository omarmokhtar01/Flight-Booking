const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");
const userModel = require("../models/userModel");

exports.deleteHandler = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const docOfModel = await Model.findByIdAndRemove(id);
    if (!docOfModel) {
      return next(new ApiError(404, ` ${Model} Cann't delete for this: ${id}`));
    }
    //  trigger 'remove ' event after update review
    docOfModel.remove();
    res.status(204).send();
  });

exports.unActiveHandler = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (Model == userModel) {
      const result = await Model.findByIdAndUpdate(
        id,
        { active: false },
        { new: true }
      );
      res.status(204).json({ result });
    }
    return next(new ApiError(404, ` ${Model} Cann't unActive for this: ${id}`));
  });

exports.updateHandler = (Model) =>
  asyncHandler(async (req, res, next) => {
    const docOfModel = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!docOfModel) {
      return next(
        new ApiError(404, `${Model} Cann't update for this: ${req.params.id}`)
      );
    }
    //  trigger 'save ' event after update review
    docOfModel.save();
    res.status(200).json({ data: docOfModel });
  });

exports.createHandler = (Model) =>
  asyncHandler(async (req, res) => {
    const docOfModel = await Model.create(req.body);
    res.status(201).json({ data: docOfModel });
  });

exports.getSpecificOne = (Model, populateOptions) =>
  asyncHandler(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    // check if virtual populate
    if (populateOptions) {
      query = query.populate(populateOptions);
    }
    const docOfModel = await query;
    if (!docOfModel) {
      // return to not continue to next code
      return next(
        new ApiError(404, `No ${docOfModel} by is id : ${req.params.id}`)
      );
    }

    res.status(200).json({ data: docOfModel });
  });

exports.getAll = (Model, modelName = "") =>
  asyncHandler(async (req, res) => {
    let filter = {};
    if (req.filterData) filter = req.filterData;
    // let filterObj = req.filterData;
    const countDocument = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .feildsLimiting()
      .search(modelName)
      .pagination(countDocument);
    // Execute
    // Destructing data
    const { queryMongoose, paginationResult } = apiFeatures;
    const docOfModel = await queryMongoose;

    res
      .status(200)
      .json({ result: docOfModel.length, paginationResult, data: docOfModel });
  });
