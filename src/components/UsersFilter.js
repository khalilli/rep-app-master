import './UsersFilter.css';
const UsersFilter = () => {
    return(
        <div className="expenses-filter">
            <div className="expenses-filter__control">
                <label>Choose a user</label>
                <select>
                <option value='0'>All</option>
                <option value='1'>User1</option>
                <option value='2'>User2</option>
                <option value='3'>User3</option>
                </select>
            </div>
        </div>
    );
};

export default UsersFilter;