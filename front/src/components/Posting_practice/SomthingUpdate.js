import React, { useState } from "react";

function SomthingUpdate() {
  const [sentence, setsentence] = useState("");
  const [disabled, setDisabled] = useState(false);

  const handleChange = ({ target: { value } }) => setsentence(value);

  const handleSubmit = async (event) => {
    setDisabled(true);
    event.preventDefault();
    await new Promise((r) => setTimeout(r, 1000));
    if (sentence.length < 1) {
      alert("공란입니다.");
    } else {
      alert(`입력한 내용: ${sentence}`);
    }
    setDisabled(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="sentence"
        name="sentence"
        value={sentence}
        onChange={handleChange}
      />
      <button type="submit" disabled={disabled}>
        등록
      </button>
    </form>
  );
}