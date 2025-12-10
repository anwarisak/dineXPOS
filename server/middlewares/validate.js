// users validation

export const userValidate = (req, res, next) => {
  const { username, email, password } = req.body;
  const errors = [];

  if (!username) errors.push("username is required");
  if (!email) errors.push("email is required");
  if (!password) errors.push("password is required");

  // Email validation (regex)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.push("Email format is invalid");
  }

  // Password validation
  if (password && password.length < 6)
    errors.push("password must be at least 6 digit");

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }
  next();
};

// product validation

export const productValidate = (req, res, next) => {
  const { name, description, price, category } = req.body;
  const errors = [];

  if (!name) errors.push("product name is required");
  if (!description) errors.push("product description is required");
  if (!price) errors.push("product price is required");
  if (!category) errors.push("product category is required");

  const file = req.file;
  if (!file) {
    errors.push("product image is required");
  } else {
    const checkImageType = ["image/jpeg"];
    if (!checkImageType.includes(file.mimetype))
      errors.push("invalid image format. Allowed formats: jpeg");
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: errors });
  }

  next();
};

// category validation

export const categoryValidate = (req, res, next) => {
  const { name, description } = req.body;
  const errors = [];
  if (!name) errors.push("category name is required");
  if (!description) errors.push("category description is required");

  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: errors });
  }

  next();
};
