import credentials from "../data/credentials.json";

function Test() {
    console.log(Object.entries(credentials)); // JSON object ready to use

    return (
        <div>
            {Object.entries(credentials).map(([index, data]) => (
                <div key={index}>
                    {data.user}: {data.password}
                </div>
            ))}
        </div>
    );
}

export default Test;