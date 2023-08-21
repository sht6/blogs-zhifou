function labelColor(label) {
  if (label === "VIP") {
    return "warning";
  } else if (label === "首播") {
    return "error";
  } else {
    return "success";
  }
}

module.exports = {
  labelColor,
};
