import { GitHub, Lightbulb, LinkedIn } from "@mui/icons-material";
import { Avatar, Card, CardContent } from "@mui/material";

export const MemberInfo = () => {
  return (
    <Card className="card">
      <CardContent>
        <div className="photo-status">
          <Avatar
            alt="member-photo"
            src="../../src/assets/img/Erfan.jpg"
            sx={{ width: 70, height: 70 }}
          />
          <Lightbulb sx={{ fontSize: "2.2rem" }} />
        </div>
        <div className="member-details">
          <div className="info">
            <strong>Name: </strong>
            <span>Erfan Riahi</span>
          </div>
          <div className="info">
            <strong>Skill(s): </strong>
            <span>HTML, </span>
            <span>CSS, </span>
            <span>Javascript, </span>
            <span>react, </span>
            <span>express</span>
          </div>
          <div className="info">
            <strong>Age:</strong>
            <span>21</span>
          </div>
          <div className="info">
            <strong>Language(s): </strong>
            <span>Persian</span>
            <span>English</span>
          </div>
          <div className="info">
            <LinkedIn />
            <span> ERN401</span>
          </div>
          <div className="info">
            <GitHub />
            <span> ErfanRiahi</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
