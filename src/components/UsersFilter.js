import './UsersFilter.css';
const UsersFilter = (props) => {
    const dropdownchange = (event) => {
        props.onChangefilter(event.target.value);
    };
    const userids = [];
    for(var i=0; i<props.items.length; i++){
        userids.push(props.items[i].userid);
    }
    console.log("Users", userids);
    return (
      <div className="expenses-filter">
        <div className="expenses-filter__control">
          <label>Choose a user:</label>
          <select value={props.selected} onChange={dropdownchange}>
            <option value='0'>Users</option>
                <option value='100991'>100991</option>
                <option value='18884'>18884</option>
                <option value='?'>?</option>
            {/* {props.items.map((item) => (
              <option value={item.userid}>{item.userid}</option>
            ))} */}
          </select>
        </div>
      </div>
    );
};

export default UsersFilter;