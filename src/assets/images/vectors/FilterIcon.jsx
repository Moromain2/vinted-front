const FilterIcon = ({ fill_color }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 100"><g><path fill={fill_color ? fill_color : "#FFFFFF"} d="M52,30.2V15c0-1.1-0.9-2-2-2s-2,0.9-2,2v15.2c-4,0.9-7,4.5-7,8.8c0,4.3,3,7.9,7,8.8c0,0.1,0,0.1,0,0.2v37c0,1.1,0.9,2,2,2   s2-0.9,2-2V48c0-0.1,0-0.2,0-0.2c4-0.9,7-4.5,7-8.8C59,34.7,56,31.1,52,30.2z M50,44c-2.8,0-5-2.2-5-5s2.2-5,5-5s5,2.2,5,5   S52.8,44,50,44z" /><path fill={fill_color ? fill_color : "#FFFFFF"} d="M76,66.8c0,0.1,0,0.1,0,0.2v18c0,1.1,0.9,2,2,2s2-0.9,2-2V67c0-0.1,0-0.2,0-0.2c4-0.9,7-4.5,7-8.8c0-4.3-3-7.9-7-8.8V15   c0-1.1-0.9-2-2-2s-2,0.9-2,2v34.2c-4,0.9-7,4.5-7,8.8C69,62.3,72,65.9,76,66.8z M78,53c2.8,0,5,2.2,5,5s-2.2,5-5,5s-5-2.2-5-5   S75.2,53,78,53z" /><path fill={fill_color ? fill_color : "#FFFFFF"} d="M24,85V67c0-0.1,0-0.2,0-0.2c4-0.9,7-4.5,7-8.8c0-4.3-3-7.9-7-8.8V15c0-1.1-0.9-2-2-2s-2,0.9-2,2v34.2c-4,0.9-7,4.5-7,8.8   c0,4.3,3,7.9,7,8.8c0,0.1,0,0.1,0,0.2v18c0,1.1,0.9,2,2,2S24,86.1,24,85z M17,58c0-2.8,2.2-5,5-5s5,2.2,5,5s-2.2,5-5,5   S17,60.8,17,58z" /></g></svg>
    )
}

export default FilterIcon;