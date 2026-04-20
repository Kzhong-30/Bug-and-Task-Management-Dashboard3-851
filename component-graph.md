# 组件关系图

## 1. 整体架构图

```mermaid
graph TB
    subgraph Root["应用根组件"]
        RootLayout["root.tsx"]
    end

    subgraph AuthRoutes["认证路由组 (_auth)"]
        AuthLayout["_auth/_layout.tsx"]
        SignIn["sign-in/"]
        SignUp["sign-up/"]
        ForgotPwd["forgot-password/"]
        OTP["otp/"]
    end

    subgraph AppRoutes["主应用路由组 (_authenticated)"]
        AppLayout["_authenticated/_layout.tsx"]
        Dashboard["_index/ 仪表盘"]
        Apps["apps/"]
        Chats["chats/"]
        Settings["settings/"]
        Tasks["tasks/"]
        Users["users/"]
    end

    subgraph SettingsGroup["设置子路由"]
        SettingsLayout["settings/_layout.tsx"]
        Profile["_index/ 个人资料"]
        Account["account/"]
        Appearance["appearance/"]
        Display["display/"]
        Notifications["notifications/"]
    end

    subgraph TasksGroup["任务管理子路由"]
        TasksLayout["tasks/_layout.tsx"]
        TasksList["_index/ 任务列表"]
        TaskCreate["create.tsx"]
        TaskDetail["$task._index.tsx"]
    end

    RootLayout --> AuthRoutes
    RootLayout --> AppRoutes
    
    AppLayout --> Dashboard
    AppLayout --> Apps
    AppLayout --> Chats
    AppLayout --> Settings
    AppLayout --> Tasks
    AppLayout --> Users
    
    Settings --> SettingsLayout
    SettingsLayout --> Profile
    SettingsLayout --> Account
    SettingsLayout --> Appearance
    SettingsLayout --> Display
    SettingsLayout --> Notifications
    
    Tasks --> TasksLayout
    TasksLayout --> TasksList
    TasksLayout --> TaskCreate
    TasksLayout --> TaskDetail
```

## 2. 布局组件层级图

```mermaid
graph TB
    subgraph AppLayout["App Layout Structure"]
        AppSidebar["AppSidebar"]
        Header["Header"]
        Main["Main"]
    end

    subgraph SidebarContent["Sidebar Components"]
        SidebarHeader["SidebarHeader"]
        SidebarContent["SidebarContent"]
        SidebarFooter["SidebarFooter"]
    end

    subgraph NavComponents["Navigation Components"]
        NavGroup["NavGroup"]
        NavUser["NavUser"]
        TeamSwitcher["TeamSwitcher"]
        NavItems["Nav Items"]
    end

    subgraph HeaderComponents["Header Components"]
        Breadcrumbs["Breadcrumbs<br/>useBreadcrumbs hook"]
        Search["Search"]
        CommandMenu["CommandMenu"]
        ProfileDropdown["ProfileDropdown"]
        ThemeSwitch["ThemeSwitch"]
    end

    AppLayout --> AppSidebar
    AppLayout --> Header
    AppLayout --> Main
    
    AppSidebar --> SidebarHeader
    AppSidebar --> SidebarContent
    AppSidebar --> SidebarFooter
    
    SidebarHeader --> TeamSwitcher
    SidebarContent --> NavGroup
    SidebarFooter --> NavUser
    NavGroup --> NavItems
    
    Header --> Breadcrumbs
    Header --> Search
    Header --> CommandMenu
    Header --> ProfileDropdown
    ProfileDropdown --> ThemeSwitch
```

## 3. UI组件体系图

```mermaid
graph TB
    subgraph Feedback["反馈组件"]
        Alert["Alert"]
        AlertDialog["AlertDialog"]
        Dialog["Dialog"]
        Sheet["Sheet"]
        Sonner["Sonner<br/>Toast通知"]
        Skeleton["Skeleton"]
    end

    subgraph Form["表单组件"]
        Button["Button"]
        Input["Input"]
        Textarea["Textarea"]
        Checkbox["Checkbox"]
        Switch["Switch"]
        RadioGroup["RadioGroup"]
        Select["Select"]
        DatePicker["DatePicker"]
        InputOTP["InputOTP"]
    end

    subgraph DataDisplay["数据展示"]
        Table["Table<br/>+ react-table"]
        Card["Card"]
        Avatar["Avatar"]
        Badge["Badge"]
        Calendar["Calendar"]
    end

    subgraph Navigation["导航组件"]
        Breadcrumb["Breadcrumb<br/>+ useBreadcrumbs"]
        Tabs["Tabs"]
        Command["Command<br/>cmdk"]
        DropdownMenu["DropdownMenu"]
    end

    subgraph Overlay["浮层组件"]
        Tooltip["Tooltip"]
        Popover["Popover"]
        HoverCard["HoverCard"]
    end

    subgraph ConformForms["Conform表单组件"]
        ConformCheckbox["ConformCheckbox"]
        ConformDatePicker["ConformDatePicker"]
        ConformField["ConformField"]
        ConformRadio["ConformRadioGroup"]
        ConformSelect["ConformSelect"]
        ConformSwitch["ConformSwitch"]
    end

    Form --> ConformForms
```

## 4. 任务管理模块组件图

```mermaid
graph TB
    subgraph TasksModule["任务管理模块"]
        TasksLayout["tasks/_layout.tsx"]
        TasksIndex["tasks/_index/index.tsx"]
        TaskCreate["tasks/create.tsx"]
        TaskDetail["tasks/$task._index.tsx"]
    end

    subgraph TasksComponents["任务组件"]
        DataTable["DataTable<br/>react-table"]
        DataTableToolbar["DataTableToolbar"]
        DataTablePagination["DataTablePagination"]
        DataTableRowActions["DataTableRowActions"]
        DataTableColumnHeader["DataTableColumnHeader"]
        DataTableFacetedFilter["DataTableFacetedFilter"]
        SearchInput["SearchInput"]
    end

    subgraph TasksForms["任务表单"]
        TasksMutateForm["TasksMutateForm"]
        TaskSchema["schema.ts<br/>Zod验证"]
    end

    subgraph TasksHooks["任务Hooks"]
        useDataTableState["useDataTableState<br/>表格状态管理"]
    end

    TasksLayout --> TasksIndex
    TasksLayout --> TaskCreate
    TasksLayout --> TaskDetail
    
    TasksIndex --> DataTable
    TasksIndex --> TasksComponents
    TasksIndex --> TasksHooks
    
    DataTable --> DataTableToolbar
    DataTable --> DataTablePagination
    DataTable --> DataTableRowActions
    DataTable --> DataTableColumnHeader
    DataTable --> DataTableFacetedFilter
    DataTableToolbar --> SearchInput
    
    TaskCreate --> TasksMutateForm
    TaskDetail --> TasksMutateForm
    TasksMutateForm --> TaskSchema
```

## 5. 用户管理模块组件图

```mermaid
graph TB
    subgraph UsersModule["用户管理模块"]
        UsersIndex["users/_index/index.tsx"]
        UserCreate["users/create.tsx"]
        UserDetail["users/$user._index.tsx"]
        UserInvite["users/invite.tsx"]
    end

    subgraph UsersComponents["用户组件"]
        UsersTable["UsersTable<br/>DataTable"]
        UsersColumns["UsersColumns"]
        UsersMutateForm["UsersMutateForm"]
        UserDeleteDialog["UserDeleteConfirmDialog"]
    end

    subgraph UsersData["用户数据"]
        UsersData["users.ts<br/>模拟数据"]
        UserSchema["schema.ts<br/>Zod验证"]
    end

    UsersIndex --> UsersTable
    UsersTable --> UsersColumns
    UsersTable --> UserDeleteDialog
    UserCreate --> UsersMutateForm
    UserDetail --> UsersMutateForm
    UsersMutateForm --> UserSchema
    UsersComponents --> UsersData
```

## 6. 设置模块组件图

```mermaid
graph TB
    subgraph SettingsModule["设置模块"]
        SettingsLayout["settings/_layout.tsx"]
        ProfileSettings["settings/_index/index.tsx"]
        AccountSettings["settings/account/index.tsx"]
        AppearanceSettings["settings/appearance/index.tsx"]
        DisplaySettings["settings/display/index.tsx"]
        NotificationsSettings["settings/notifications/index.tsx"]
    end

    subgraph SettingsComponents["设置组件"]
        SidebarNav["SidebarNav<br/>侧边导航"]
        ContentSection["ContentSection<br/>内容区块"]
        ProfileForm["ProfileForm"]
        AccountForm["AccountForm"]
        AppearanceForm["AppearanceForm"]
        DisplayForm["DisplayForm"]
        NotificationsForm["NotificationsForm"]
    end

    subgraph SettingsForms["设置表单"]
        AppearanceSwitch["AppearanceForm<br/>Theme切换"]
    end

    SettingsLayout --> SidebarNav
    SettingsLayout --> ProfileSettings
    SettingsLayout --> AccountSettings
    SettingsLayout --> AppearanceSettings
    SettingsLayout --> DisplaySettings
    SettingsLayout --> NotificationsSettings
    
    ProfileSettings --> ProfileForm
    AccountSettings --> AccountForm
    AppearanceSettings --> AppearanceForm
    AppearanceForm --> AppearanceSwitch
    DisplaySettings --> DisplayForm
    NotificationsSettings --> NotificationsForm
    
    ProfileSettings --> ContentSection
    AccountSettings --> ContentSection
    AppearanceSettings --> ContentSection
    DisplaySettings --> ContentSection
    NotificationsSettings --> ContentSection
```

## 7. 自定义Hooks依赖图

```mermaid
graph LR
    subgraph Hooks["自定义 Hooks"]
        useBreadcrumbs["useBreadcrumbs"]
        useDebounce["useDebounce"]
        useDialogState["useDialogState"]
        useMobile["useMobile"]
        useSmartNavigation["useSmartNavigation"]
        useDataTableState["useDataTableState<br/>表格状态"]
    end

    subgraph ReactRouter["React Router"]
        useMatches["useMatches"]
        useMatches2["useMatches"]
        href["href"]
        Link["Link"]
    end

    subgraph React["React"]
        useState["useState"]
        useEffect["useEffect"]
        useCallback["useCallback"]
        useMemo["useMemo"]
    end

    subgraph External["外部库"]
        setTimeout["setTimeout"]
        localStorage["localStorage"]
    end

    useBreadcrumbs --> useMatches
    useBreadcrumbs --> Link
    useBreadcrumbs --> href
    
    useDebounce --> useState
    useDebounce --> useEffect
    useDebounce --> setTimeout
    
    useDialogState --> useState
    useDialogState --> useCallback
    
    useMobile --> useEffect
    useMobile --> useState
    useMobile --> localStorage
    
    useSmartNavigation --> useMatches2
    useSmartNavigation --> useCallback
    
    useDataTableState --> useState
    useDataTableState --> useCallback
    useDataTableState --> useMemo
```

## 8. 认证路由组件图

```mermaid
graph TB
    subgraph AuthModule["认证模块"]
        AuthLayout["_auth/_layout.tsx"]
        SignIn["sign-in/index.tsx"]
        SignUp["sign-up/index.tsx"]
        ForgotPassword["forgot-password/index.tsx"]
        OTP["otp/index.tsx"]
        SignIn2["sign-in-2/index.tsx"]
    end

    subgraph AuthForms["认证表单"]
        UserAuthForm["UserAuthForm"]
        SignUpForm["SignUpForm"]
        ForgotPasswordForm["ForgotPasswordForm"]
        OTPForm["OTPForm"]
    end

    subgraph AuthSchemas["认证验证"]
        SignInSchema["sign-in/+schema.ts<br/>Zod"]
        SignUpSchema["sign-up/+schema.ts<br/>Zod"]
        ForgotSchema["forgot-password/+schema.ts<br/>Zod"]
        OTPSchema["otp/+schema.ts<br/>Zod"]
    end

    AuthLayout --> SignIn
    AuthLayout --> SignUp
    AuthLayout --> ForgotPassword
    AuthLayout --> OTP
    AuthLayout --> SignIn2
    
    SignIn --> UserAuthForm
    SignIn2 --> UserAuthForm
    SignUp --> SignUpForm
    ForgotPassword --> ForgotPasswordForm
    OTP --> OTPForm
    
    UserAuthForm --> SignInSchema
    SignUpForm --> SignUpSchema
    ForgotPasswordForm --> ForgotSchema
    OTPForm --> OTPSchema
```

## 9. Context 数据流图

```mermaid
graph TB
    subgraph Contexts["React Contexts"]
        ThemeContext["ThemeProvider<br/>next-themes"]
        SearchContext["SearchContext<br/>搜索状态"]
    end

    subgraph Consumers["Context Consumers"]
        ThemeSwitch["ThemeSwitch<br/>切换主题"]
        CommandMenu["CommandMenu<br/>使用主题"]
        SearchComponent["Search<br/>搜索框"]
    end

    subgraph ThemeStorage["主题存储"]
        LocalStorage["localStorage"]
        CSSVars["CSS Variables"]
        DocumentClass["document.classList"]
    end

    ThemeContext --> ThemeSwitch
    ThemeContext --> CommandMenu
    ThemeContext --> ThemeStorage
    
    SearchContext --> SearchComponent
    SearchContext --> CommandMenu
    
    LocalStorage --> ThemeContext
    CSSVars --> ThemeContext
```

## 10. 组件复用关系图

```mermaid
graph TB
    subgraph SharedComponents["共享组件"]
        DataTable["DataTable<br/>通用表格"]
        ConfirmDialog["ConfirmDialog<br/>确认对话框"]
        PageHeader["PageHeader<br/>页面头部"]
        SearchInput["SearchInput<br/>搜索输入"]
    end

    subgraph Modules["业务模块"]
        TasksModule["Tasks模块"]
        UsersModule["Users模块"]
        SettingsModule["Settings模块"]
        AuthModule["Auth模块"]
    end

    subgraph Tables["表格实例"]
        TasksTable["Tasks Table<br/>任务列表"]
        UsersTable["Users Table<br/>用户列表"]
    end

    subgraph Forms["表单实例"]
        TaskForm["Task Forms<br/>任务表单"]
        UserForm["User Forms<br/>用户表单"]
        SettingsForms["Settings Forms<br/>设置表单"]
        AuthForms["Auth Forms<br/>认证表单"]
    end

    DataTable --> TasksTable
    DataTable --> UsersTable
    
    TasksTable --> TasksModule
    UsersTable --> UsersModule
    
    ConfirmDialog --> TasksModule
    ConfirmDialog --> UsersModule
    
    PageHeader --> SettingsModule
    PageHeader --> TasksModule
    PageHeader --> UsersModule
    
    SearchInput --> TasksModule
    SearchInput --> UsersModule
    
    TaskForm --> TasksModule
    UserForm --> UsersModule
    SettingsForms --> SettingsModule
    AuthForms --> AuthModule
```
