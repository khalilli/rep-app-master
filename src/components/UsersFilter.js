import './UsersFilter.css';
const UsersFilter = (props) => {
    const dropdownchange = (event) => {
        props.onChangefilter(event.target.value);
    };
    return(
        <div className="expenses-filter">
            <div className="expenses-filter__control">
                <label>Choose a user:</label>
                <select value={props.selected} onChange={dropdownchange}>
                <option value='0'>All</option>
                <option value='1'>12</option>
                <option value='2'>14</option>
                </select>
            </div>
        </div>
    );
};

export default UsersFilter;