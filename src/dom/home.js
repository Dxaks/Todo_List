import "./styleSheet/default.css";
import { mySvgs } from "../assets/svgs/svg";
import logo from "../assets/images/todo_logo.png";


export const buildHomePageElement = (function() {
    const body = document.querySelector('body');
    body.className = 'open';

    const getNavBar = () => {
        const navBar = document.createElement('nav');
        navBar.className = 'navBar';

        const cancelMenu = document.createElement('div')
        cancelMenu.className = 'cancelMenu';
        cancelMenu.innerHTML = mySvgs.closeMenu;
        navBar.appendChild(cancelMenu);

        const logoDiv = document.createElement('div');
        logoDiv.className = 'logoDiv';
        navBar.appendChild(logoDiv);

        const logoImage = document.createElement('img');
        logoImage.src = logo;
        logoDiv.appendChild(logoImage);

        const ul = document.createElement('ul');
        let navList = [
            'nav 1',
            'nav 2',
            'nav 3',
            'nav 4',
        ];
        navList.forEach((list) => {
            const li = document.createElement('li');
            li.className = 'navList';
            li.textContent = list;

            ul.appendChild(li);
    })
        navBar.appendChild(ul);
        body.appendChild(navBar);

        return navBar;
    }
    
    const getContent = () => {
        const content = document.createElement('div');
        content.className = 'content';

        const menuTrigger = document.createElement('div');
        menuTrigger.className = 'menuTrigger';
        menuTrigger.innerHTML =  mySvgs.menuBar;
        content.appendChild(menuTrigger);

        body.appendChild(content);

        return content;
    }
    
    return {
        getNavBar,
        getContent,
    }
})();

const renderHomePage = () => {
    const body = document.querySelector('body')
    const sideBar = buildHomePageElement.getNavBar();
    const content = buildHomePageElement.getContent();
    const menu = document.querySelector('.menuTrigger');
    console.log(menu)

    body.addEventListener('click', (e) => {
        const element = e.target;
          if (element.closest('.menuTrigger')) {
            body.classList.toggle('closed');
            menu.classList.toggle('hidden');
        } else if (element.closest('.cancelMenu')) {
            body.classList.toggle('closed');
            menu.classList.toggle('hidden');
            
        }
    })
} 

export const homePage = renderHomePage();

