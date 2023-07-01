import React, { useState } from "react";

const Item = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(props.name);
  const [editDate, setEditDate] = useState("");

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("edit la ",editedTask);
    props.edit(props.id, editedTask, editDate);
  };

  const handleInputChange = (e) => {
    setEditedTask(e.target.value);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "25px", padding: "15px", backgroundColor: "gray", borderRadius: "10px" }}>
  <div style={{ display: "flex", flexDirection: "column" }}>
    {isEditing ? (
      <input style={{ height: "2px", fontSize: "15px", marginBottom: "5px" }} type="text" value={editedTask} onChange={handleInputChange} />
    ) : (
      <div style={{ fontWeight: "bold", color: "gold", marginBottom: "5px" }}>{props.name}</div>
    )}

    <div style={{ display: "flex", alignItems: "center" }}>
    {isEditing ?"":<div style={{ marginRight: "10px" }}>Date left:</div>}
      {isEditing ? (
        <input style={{ height: "2px", fontSize: "15px" }} type="date" onChange={(e) => { setEditDate(props.cal(e.target.value)); console.log(editDate) }} />
      ) : (
        <div style={{ fontWeight: "bold", color: "gold" }}>{props.leftDate}</div>
      )}
    </div>
  </div>

  <div style={{ width: "20%", display: "flex", justifyContent: "space-around" }}>
    {isEditing ? (
      <button style={{ padding: "8px", fontSize: "15px", borderRadius: "5px" }} onClick={handleSave}>Save</button>
    ) : (
      <button style={{ padding: "8px", fontSize: "15px", borderRadius: "5px" }} onClick={handleEdit}>Edit</button>
    )}
    <button style={{ padding: "8px", fontSize: "15px", borderRadius: "5px" }} onClick={() => props.delete(props.id)}>Delete</button>
  </div>
</div>

  );
};

export default Item;
