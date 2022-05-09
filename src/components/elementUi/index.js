//按需导入组件
import {
    Button,
    Input,
    Form,
    Drawer,
    Tabs,
    Menu,
    MenuItem,
    RadioGroup,
    Radio,
    Image,
    Select,
    Option,
    Submenu,
    Carousel,
    Collapse,
    CarouselItem,
    CollapseItem,
    TabPane,
    FormItem,
    Message,
    MessageBox,
    Notification,
    Loading,
    PageHeader,
    Popover,
    Autocomplete,
    Card,
    Breadcrumb,
    BreadcrumbItem,
    Col,
    Row,
    InputNumber,
    Steps,
    Step,
    Descriptions,
    DescriptionsItem,
    Tag,
    Dialog,
} from 'element-ui'

const coms = [
    Button,
    Input,
    Form,
    Drawer,
    Tabs,
    Menu,
    MenuItem,
    RadioGroup,
    Radio,
    Image,
    Select,
    Option,
    Submenu,
    Carousel,
    Collapse,
    CarouselItem,
    CollapseItem,
    TabPane,
    FormItem,
    PageHeader,
    Popover,
    Autocomplete,
    Card,
    Breadcrumb,
    BreadcrumbItem,
    Col,
    Row,
    InputNumber,
    Steps,
    Step,
    Descriptions,
    DescriptionsItem,
    Tag,
    Dialog,
]
export default {
    install(Vue, options) {
        coms.map(c => {
            Vue.component(c.name, c)
        })
        Vue.use(Loading);    // 使用服务方式的话，只安装Loading即可
        Vue.use(Loading.directive);
        Vue.prototype.$message = Message;
        Vue.prototype.$confirm = MessageBox.confirm;
        Vue.prototype.$alert = MessageBox.alert;
        Vue.prototype.$notify = Notification;
    }

}
