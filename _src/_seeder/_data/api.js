module.exports = [
    {
        router:"/user", 
        method: "/get",
        url:"/api/user/ViewProfile",
        feature:"view-profile"    
    },
    
    {
        router:"/user", 
        method: "/get",
        url:"/api/user/ViewOwnEmployee",
        feature:"view-own-employee-list"    
    },
        
    {
        router:"/admin", 
        method: "/post",
        url:"/api/admin/upgrade",
        feature:"upgrade-user"    

    },
        
    {
        router:"/admin", 
        method: "/patch",
        url:"/api/admin/upgrade/:id",
        feature:"upgrade-user-by-id"    
    },
        
    {
        router:"/user", 
        method: "/get",
        url:"/api/user/displayEmployeeList",
        feature:"view-employee-list"    

    },
        
    // {
    //     router:"/user", 
    //     method: "/get",
    //     url:"/api/user/ViewOwnEmployee",
    //     feature:"view employee list"    

    // },
    // {
    //     router:"/user", 
    //     method: "/get",
    //     url:"/api/user/ViewProfile",
    //     feature:"view profile"   
    // },
    // {
    //     router:"/user", 
    //     method: "/get",
    //     url:"/api/user/ViewProfile"    
    // },
    
]