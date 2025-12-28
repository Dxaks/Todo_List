import "./styleSheet/default.css";
import { mySvgs } from "../assets/svgs/svg";
import logo from "../assets/images/todo_logo.png";


const buildHomePageElement = (function() {
    const body = document.querySelector('body');
    body.classList.add('closed');

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
            'My Project',
            'nav 2',
            'nav 3',
            'nav 4',
        ];
        navList.forEach((list) => {
            const li = document.createElement('li');
            let anotherClass = list.split(' ').join('');
            li.className = 'navList';
            li.textContent = list;
            li.classList.add(anotherClass);

            ul.appendChild(li);
    })
        navBar.appendChild(ul);
        body.appendChild(navBar);


    const getNavBar = () => {
        return navBar;
    }

    const content = document.createElement('div');
        content.className = 'content';

        const menuTrigger = document.createElement('div');
        menuTrigger.className = 'menuTrigger';
        menuTrigger.innerHTML =  mySvgs.menuBar;
        body.appendChild(menuTrigger);

        body.appendChild(content);
    
    const getContent = () => {
        return content;
    }
    
    return {
        getNavBar,
        getContent,
    }
})();


const setNavClickHandlers = () => {
    const body = document.querySelector('body')
    const sideBar = buildHomePageElement.getNavBar();
    const content = buildHomePageElement.getContent();
    const menuSvg = document.querySelector('.menuTrigger');
    
    body.addEventListener('click', (e) => {
        const element = e.target;
          if (element.closest('.menuTrigger')) {
            body.classList.toggle('open');
            menuSvg.classList.toggle('hidden');
        } else if (element.closest('.cancelMenu')) {
            body.classList.toggle('open');
            menuSvg.classList.toggle('hidden');            
        } else if (element.classList.contains('menuButton')) {
            body.classList.toggle('open');
        }
    })
} 


const setTextToContentDiv = () => {
    const content = buildHomePageElement.getContent();
    
    const titleDiv = document.createElement('div');
    titleDiv.className = 'titleDiv';

    const title = document.createElement('h1');
    title.className = 'title';
    title.textContent = 'Greetings from TodoSite!';
    titleDiv.appendChild(title);

    const welcomeNote = document.createElement('h2');
    welcomeNote.className = 'welcomeNote'
    welcomeNote.textContent = "We're here to make your life easier. With our TodoApp, we can prioritize your professional life and activities efficiently and simplify your daily tasks";
    titleDiv.appendChild(welcomeNote);

    const buttonDiv = document.createElement('div');
    buttonDiv.className = 'buttonDiv';

    const buttons = [
        'Menu',
        'Explore'
    ];
    buttons.forEach((button) => {
        const btn = document.createElement('button');
        btn.textContent = button;
        button === 'Menu' ? btn.className = 'menuButton' : btn.classList.remove();
        buttonDiv.appendChild(btn);
    })
    titleDiv.appendChild(buttonDiv);

    content.appendChild(titleDiv);
};

export const initialRender = () => {
    setNavClickHandlers();
    setTextToContentDiv();
}

