// CourseSelector.js
import React from "react";

const CourseSelector = ({
  availableCourses,
  selectedCourses,
  onSelect,
  onRemove,
}) => {
  return (
    <div>
      <h5>Available Courses</h5>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {availableCourses.map((course) => (
          <li
            key={course._id}
            style={{
              padding: "8px",
              margin: "4px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={(event) => onSelect(event, course)}
          >
            {course.name}
          </li>
        ))}
      </ul>
      <h5>Selected Courses</h5>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {selectedCourses.map((course) => (
          <li
            key={course._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px",
              margin: "4px",
              border: "1px solid #ccc ",
              borderRadius: "4px",
              cursor: "pointer",
              height: "38px",
            }}
          >
            {course}
            <i
              className="fa fa-trash-o"
              aria-hidden="true"
              onClick={() => onRemove(course)}
              style={{
                marginLeft: "8px",
                padding: "6px 10px",
                background: "#7669fc",
                color: "#CCF5CE",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            ></i>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseSelector;
