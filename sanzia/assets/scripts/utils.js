const obj = {

    isEmpty(obj) {
        for (let prop in obj)
            if (obj.hasOwnProperty(prop))
                return false;
        return true;
    }

}

const str = {
    capitalize(s) {
        return s[0].toUpperCase() + s.slice(1);
    }
}

const dateFormat = {
    date() {
        const date = new Date();
        
        const year = date.getFullYear();
        const month = ((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
        const dateDay = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate();
        const seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
        const minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
        const hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();

        return `${dateDay}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
    }
}

export { obj, str, dateFormat };