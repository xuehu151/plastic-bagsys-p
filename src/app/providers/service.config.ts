import { environment } from '../../environments/environment';

export class ServiceConfig {
    // 获取首页数据
    public static APIBASE = environment.apiBase;
    public static LOGIN = 'public/loginByPassword'; // 登录
    //用户
    public static USER = 'sys/user/findPage';
    public static EDITUSER = 'sys/user/edit';//编辑
    public static ADDUSER = 'sys/user/add';//添加
    public static GETUSERINFO = 'sys/user/getUserInfo';//获取用户信息
    //角色
    public static CHANGEROLE = 'sys/role/';
    public static ROLE = 'sys/role/findPage';
    public static ROLELIST = 'sys/role/list';
    //商品
    public static ADDGOOD = 'biz/goods/add';//添加商品
    public static GOODLIST  = 'biz/goods/list';//商品列表
    public static GOODSPAGE = 'biz/goods/findPage';
    public static UPDATEGOODS = 'biz/goods/';
    //设备
    public static ADDDEVICE = 'biz/device/add';
    public static EDITDEVICE = 'biz/device/edit';
    public static DEVICELIST = 'biz/device/findPage';
    public static QUERYDEVICE = 'biz/device/info/';//根据id查询
    //功能
    public static GETUSERMENU = 'sys/user/getUserMenu';
    public static INFOBYID = 'sys/role/infoById/';
    public static MENUADD = 'sys/func/add';
    public static MENUEDIT = 'sys/func/edit';
    public static MENULIST = 'sys/func/list';
    public static MENUTREE = 'sys/func/tree';
    //代理商管理
    public static ADDAGENT = 'biz/agent/add';
    public static EDITAGENT = 'biz/agent/edit';
    public static AGENTLIST = 'biz/agent/findPage';
    public static QUERYAGENT = 'biz/agent/infoById/';//根据id查询
    public static ISENABLE = 'biz/device/editIsEnable';
    public static FINDBYPHONE = 'biz/agent/infoByPhone/';
    public static FINDAGENT = 'biz/agent/infoByDefault';
    //会员管理接口
    public static MEMBER = 'sys/member/findPage';
    //采购
    public static PURCHASE = 'biz/order/purchase/findPage';
    //扫描
    public static SCANORDER = 'biz/order/scan/findPage';
    //编辑运单号
    public static TRACKNUM = 'biz/order/purchase/update/trackNum';
    //打款
    public static WITHDRAW = 'biz/withdraw/findPage';
    public static AUDIT = 'biz/withdraw/audit';
    //生成二维码
    public static CREATQRCODE = 'biz/device/createQRCode';
    //导出
    public static EXPORTDEVICE = 'biz/device/exportDevice';
    public static EXPORTAGENT = 'biz/agent/exportAgent';
    public static EXPORTMEMBER = 'sys/member/exportMember';
    public static EXPORTORDER = 'biz/order/purchase/exportOrder';
    public static EXPORTHISTORYORDER = 'biz/order/purchase/exportHistoryOrder';
    public static EXPORTSCANORDER = 'biz/order/scan/exportOrder';
    public static EXPORTWITHDRAWRECORD = 'biz/withdraw/exportWithdrawRecord';
    public static EXPORTHISTORYWITHDRAWRECORD = 'biz/withdraw/exportHistoryWithdrawRecord';
}

