export default function StarsRating(props) {
    const item = props.Rating;
    const numberOfYellowStars = Math.round(item);
    const numberOfBlackStars = 5 - numberOfYellowStars;

    // Create an array to hold all the star elements
    const stars = [];

    // Add yellow stars
    for (let i = 0; i < numberOfYellowStars; i++) {
        stars.push(<svg key={`yellow_${i}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="yellow" viewBox="0 0 16 16">
            <path d="M8.3,12.4l-3.8,2L4,11.4l-2.8-1.6l4-4.3L5.2,3.2L8,4.1l2.8-0.9l0.9,2.8l4,4.3 L8.3,12.4z"/>
        </svg>);
    }

    // Add black stars
    for (let i = 0; i < numberOfBlackStars; i++) {
        stars.push(<svg key={`black_${i}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" viewBox="0 0 16 16">
            <path d="M8,11.3l3.8,2.3l-0.9-3.1L14,7.4l-3-0.3l-1.2-2.8L8,2.8L6.2,4.4L5,7.1l-3,0.3l2.7,2.1L8,11.3z"/>
        </svg>);
    }

    return (
        <span>
            {stars}
        </span>
    );
}
