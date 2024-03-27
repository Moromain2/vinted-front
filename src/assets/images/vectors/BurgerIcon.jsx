const BurgerIcon = ({ fill_color }) => {
    return (
        <svg viewBox="0 0 24 24" width="24" height="24"><path d="M2 20h20v-1.5H2V20zM2 5.5h20V4H2v1.5zm0 7.25h20v-1.5H2v1.5z" fill={fill_color ? fill_color : "#757575"}></path></svg>
    )
}

export default BurgerIcon;