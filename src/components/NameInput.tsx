import React, { useState } from "react";
import "../css/NameInput.css";

interface Name {
  firstName: string;
  lastName: string;
}

const NameInput = () => {
  const [fullName, setFullName] = useState<string>("");
  const [names, setNames] = useState<Name[]>([]);
  const [fullNamesList, setFullNamesList] = useState<string[]>([]);

  const handleNameChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setFullName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const cleanedNames = fullName //remove firstName & surName
      .replace(
        /firstname|firstName|FirstName|Firstname|lirstname|lastName|LastName|Lastname|surname/g,
        ""
      ) // Remove unnecessary characters and split by commas
      .replace(/[\[\](){}":.]/g, "")
      .split(",") // Split the string into an array of names
      .map((name) => name.trim()) // Trim whitespace from
      .filter(Boolean); // Remove empty names

    // Create new array of objects with first and last name properties
    const formattedNames = cleanedNames.map((name) => {
      const [firstName, lastName] = name.split(", ");
      return {
        firstName,
        lastName,
      };
    });

    setNames(formattedNames);
    setFullNamesList(cleanedNames);
    // Do something with the submitted names, like generating random names or a key
  };

  const handleRandomize = (): void => {
    // Copy the array of names
    const randomizedNames = [...fullNamesList];

    // Shuffle the array in groups of 3
    for (let i = randomizedNames.length - 1; i > 0; i -= 3) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomizedNames[i], randomizedNames[j]] = [
        randomizedNames[j],
        randomizedNames[i],
      ];
    }
    setFullNamesList(randomizedNames);
    setNames(
      randomizedNames.map((name) => {
        const [firstName, lastName] = name.split(", ");
        return {
          firstName,
          lastName,
        };
      })
    );
  };

  return (
    <div className="name-input-container">
      <form onSubmit={handleSubmit}>
        <div className="name-input-field">
          <label htmlFor="name-input">Full name:</label>
          <textarea
            id="name-input"
            name="name-input"
            value={fullName}
            onChange={handleNameChange}
            placeholder="Enter full name(s) separated by commas"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {names.length > 0 && (
        <div className="names-container">
          <ul>
            {names.map((name, index) => (
              <li key={index} className="button">
                {name.firstName} {name.lastName}
              </li>
            ))}
          </ul>
          <button className="randomize-button" onClick={handleRandomize}>
            Randomize names in groups of 3
          </button>
        </div>
      )}
    </div>
  );
};

export default NameInput;
