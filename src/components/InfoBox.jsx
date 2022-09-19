function InfoBox(props) {
    return (
        <div>
            <h1 className="font-bold text-4xl mb-5">{props.headerText}</h1>
            <p className="text-lg mb-10">{props.paragraphText}</p>
        </div>
    )
}

export default InfoBox;