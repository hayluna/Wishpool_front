export default {
    userId: '',
    token: localStorage.getItem('wishToken') || '',
    status:'',
    sid:'',
    registerErrMsg : '',
    query: '',
    myProfile:{}, //내 프로필의 followingId, followerId는 id목록이 아닌 populated된 객체임.
    myAllItemList: [],
    searchUserList:[],
    currentUser:{},
    othersFollowings: [],
    othersFollowers: [],
    othersAllItemList: [],
    notiList: [],
    loading: true,
    tab1: true,
    tab2: false,
    tab3: false,
    tab4: false,
    noti:{
        type: '', // 3 types: noti-follow, noti-request, noti-response
        userId: '',
        by: '', //nickname
        profileImgPath: '',
        profileImgName : '',
        itemName:'',
        date: '',
        nid:'',
        haveRead: false
    },
    notiNum: 0,
}