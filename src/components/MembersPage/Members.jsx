import { faCircleUser, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../generalStyle.css";
import "./style.css";

export const Members = () => {
  return (
    <main>
      <section className="search-add">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search members..."
          className="searchMember"
        />
        <button className="addMember">Add member</button>
      </section>

      <section className="members">
        <div className="member">
          <div className="member-details">
            <FontAwesomeIcon icon={faCircleUser} />
            <FontAwesomeIcon icon={faLightbulb} />
            <span>
              <strong>Name:</strong> Erfan Riahi
            </span>
            <span className="field">
              <strong>Skills:</strong>
              <div className="field-detail">
                <span>HTML</span> <span>CSS3</span> <span>JavaScript</span>
                <span>JavaScript</span>
                <span>JavaScript</span>
                <span>JavaScript</span>
              </div>
            </span>
            <span>
              <strong>Age:</strong> 21
            </span>
            <span className="field">
              <strong>Language(s):</strong>{" "}
              <div className="field-detail">
                <span>Persian</span> <span>English</span>
              </div>
            </span>
            <span>
              <strong>LinkedIn:</strong> ERN401
            </span>
            <span>
              <strong>Github:</strong> ErfanRiahi
            </span>
          </div>
          <div className="field">
            <span>
              <strong>Tasks:</strong>
            </span>
            <div className="field-detail">
              <span>task1</span>
              <span>task2</span>
              <span>task3</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
