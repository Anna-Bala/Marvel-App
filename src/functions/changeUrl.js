const changeUrl = (main_string, ins_string, pos) => main_string.slice(0, pos) + ins_string + main_string.slice(pos);

export default changeUrl;