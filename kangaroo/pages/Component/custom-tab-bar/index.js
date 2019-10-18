// pages/Component/custom-tab-bar/index.js
Component({
    data: {
        selected: 0,
        color: '#8c8c8c',
        selectedColor: "#f4645f",
        backgroundColor: 'white',

        list: [
            {
                pagePath: "pages/home/home",
                text: "首页",
                iconPath: "../../image/home.png",
                selectedIconPath: "../../image/home.png"
            }
        ]
        
    }
})