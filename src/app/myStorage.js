import { allProject } from "./project";


export function populateStorage() {
    localStorage.setItem('allProjectFolder', JSON.stringify(allProject));
};

