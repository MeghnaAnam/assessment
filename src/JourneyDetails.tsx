type componentProps = {
    travelTime : string;
    milesToTravel:string;
}

const JourneyDetails : React.FC<componentProps> = (props) => {
    return (
    <div>
        <p>{props.travelTime} minutes of travel time</p>
        <p>{props.milesToTravel} miles of travel</p>
    </div>
)}


export default JourneyDetails;