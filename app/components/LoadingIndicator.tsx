const LoadingIndicator = ({ ballSize = 8 }) => {
    return (
        <div className='flex items-center justify-center h-full'>
            <div className='flex space-x-2 justify-center items-center '>
                <div
                    className={`rounded-full animate-bounce [animation-delay:-0.3s]`}
                    style={{
                        backgroundColor: "white",
                        height: ballSize,
                        width: ballSize,
                    }}></div>
                <div
                    className={`rounded-full animate-bounce [animation-delay:-0.15s]`}
                    style={{
                        backgroundColor: "white",
                        height: ballSize,
                        width: ballSize,
                    }}></div>
                <div
                    className={`rounded-full animate-bounce`}
                    style={{
                        backgroundColor: "white",
                        height: ballSize,
                        width: ballSize,
                    }}></div>
            </div>
        </div>
    );
};

export default LoadingIndicator;
