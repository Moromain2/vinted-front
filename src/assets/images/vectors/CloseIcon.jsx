const CloseIcon = ({ fill_color }) => {
    return (
        <svg viewBox="0 0 24 24" width="24" height="24"><path d="M18.94 4 12 10.94 5.06 4 4 5.06 10.94 12 4 18.94 5.06 20 12 13.06 18.94 20 20 18.94 13.06 12 20 5.06z" fill={fill_color ? fill_color : "#757575"}></path></svg>
    )
}

export default CloseIcon;