// check email address
export const isEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

// ISO Date to Date string
export const dataObjecet = (date) => {
  const dateObject = new Date(date);

  dateObject.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const splitDate = dateObject.toString().split(" ");

  return `${splitDate[2]} ${splitDate[1]} ${splitDate[3]}`;
};

// check Bangladeshi phone number
export const bdPhoneNumber = (number) => {
  const regex = /(\+88)?01[0-9]{9}$/;
  return regex.test(number);
};

// check available or not
export const isAvailable = (date) => {
  // Create a Date object from the base date
  const lastDonateDate = new Date(date);

  // Add 120 days in milliseconds
  const millisecondsToAdd = 120 * 24 * 60 * 60 * 1000;

  // Add the milliseconds to the lastDonateDate
  const dateAfter120Day = new Date(
    lastDonateDate.getTime() + millisecondsToAdd
  );

  // Check if the current date is greater than the dateAfter120Day or not

  if (Date.now() > dateAfter120Day.getTime()) {
    return true;
  } else {
    return false;
  }
};

// data with pagination
export const dataWithPagination = (data = [], page = 1, entries = 10) => {
  const startIndex = (page - 1) * entries;
  const endIndex = page * entries;

  const resultData = data?.slice(startIndex, endIndex);
  const totalPage = Math.ceil(data?.length / entries);

  return {
    data: resultData || [],
    totalMatches: data,
    page,
    totalPage: totalPage || 1,
  };
};

// search data by input value
export const searchData = (payload = [], searchValue, fields = []) => {
  const result = payload.filter((data) => {
    const values = fields.map((field) => data[field]);
    const isMatch = values.some((value) => {
      return value
        ?.toString()
        .toLowerCase()
        .includes(searchValue.toLowerCase());
    });
    return isMatch;
  });
  return result;
};
