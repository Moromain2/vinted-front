const ManifyingGlass = ({ fill_color }) => {
    return (
        <svg viewBox="0 0 16 16" width="16" height="16"><path d="M7 11.5a4.5 4.5 0 1 1 .01-9.01A4.5 4.5 0 0 1 7 11.5zm4.74-.82a6 6 0 1 0-1.06 1.06l3.25 3.25L15 13.93l-3.25-3.25z" fill={fill_color ? fill_color : "#757575"}></path></svg>
    )
}

export default ManifyingGlass;