const advancedResults = (model, populate) => async (req, res, next) => {
  let query;
  let reqQuery = { ...req.query }; //req.query comes from the route, www.website.com?disIsWiaDQueryStarts
  //to add anoda query use "&"

  // www.website.com?location.state=MA&housing=true will give us in the req.query this
  //{'location.state' = 'MA',housing = 'true'}
  //so we can now do model.find(req.query)

  //for www.website.com?averageCost[lte]=1000
  //will giv {averageCost : {lte : '1000'}}
  //wic is ok jst dt $ sign is not behind the lte,we took care of it in d 1st querryString

  //this constant is to remove these fields in the array from the reqQuery bcos mongoose
  //will see them as a separate field in the database and will try searching for them
  //example is www.website.com?select=name,description, moongoose will goan look for select field in d db
  //so we remove them and handle them specially
  //dis field will look like {select = name,description}
  const removeFields = ["select", "sort", "page", "limit"];

  //remove any params in the remove fields from the reqQuery,NB: is bin removed in d
  //reqQuery nd not in d removeFields
  removeFields.map(fields => delete reqQuery[fields]);

  //this is to put this in the form of a mongoose aggregate query i.e  age: { $gt: 17, $lt: 66 }
  //bcos the req.params will appear like this but without th $ sign
  let queryString = JSON.stringify(reqQuery).replace(
    /\b(lte|lt|gte|gt|in)\b/g,
    match => `$${match}`
  );

  query = model.find(JSON.parse(queryString));
  //for select field
  if (req.query.select) {
    //d next line means, split d req.query.select into an array nd separate its value at the comma
    //i.e ["name","description"]
    //then join it bk to a string at each space wud look like name description wic is how mongoose wants it
    const fields = req.query.select.split(",").join(" ");
    //d next line z how mongoose selects fields
    query.select(fields);
  }
  //for sort field, and if no sort field provided,is gpna sort by date by default
  // www.website.com?sort=name
  if (req.query.sort) {
    const fields = req.query.sort.split(",").join(" ");
    query.sort(fields);
  } else {
    query.sort("-createdAt");
  }

  if (populate) {
    query.populate(populate);
  }

  //for pagination and limit
  //the parseInt() is because req.query is a string, so we convert to a number
  //NB this executes as a default

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit; //more like a skip so so number of queries b4 doin anytn
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query.skip(startIndex).limit(limit);

  //executing the query
  const results = await query;
  const pagination = {};

  //to check if there would be a next page
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  //to check if there would be a last page

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }
  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results
  };
  next();
};

module.exports = advancedResults;
