<template>
    <div class="view"> 
        <div id="mySidenav" class="sidenav">
            <a href="javascript:void(0)" class="closebtn" style="font-size:2.5rem; color:black;" @click="closeNav">&times;</a>
            <div style="padding-left: 4rem; margin-top: 2rem;">
                <p style="font-weight:bold; font-size:1.5rem;color:transparent;">위시리스트</h4>
                <p style="margin-bottom:0;color:transparent;">총 금액</p>
                <p style="color:transparent; font-weight:bold; font-size:1.5rem;">{{ wishTotal }}원</p>
            </div>
            <div style="padding-left: 4rem; margin-top: 2rem;">
                <p style="font-weight:bold; font-size:1.5rem;color:transparent;">완료리스트</p>
                <p style="margin-bottom:0;color:transparent;">총 금액</p>
                <p style="color:transparent; font-weight:bold; font-size:1.5rem;">{{ doneWishTotal }}원</p>
            </div>
        </div>
        <div class="fix-top">
            <div class="header">
                <div class="nav" @click="openNav">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="14" viewBox="0 0 17 14">
                    <g id="구성_요소_5_1" data-name="구성 요소 5 – 1" transform="translate(1 1)">
                        <line id="선_22" data-name="선 22" x2="8" fill="none" stroke="#3a404a" stroke-linecap="round" stroke-width="2"/>
                        <line id="선_23" data-name="선 23" x2="15" transform="translate(0 6)" fill="none" stroke="#3a404a" stroke-linecap="round" stroke-width="2"/>
                        <line id="선_24" data-name="선 24" x2="12" transform="translate(0 12)" fill="none" stroke="#3a404a" stroke-linecap="round" stroke-width="2"/>
                    </g>
                    </svg>
                </div>
                <div class="title">위시리스트</div>
                <div class="add-button" @click="onInsert">
                    <span class="add-text">추가</span>
                    <div class="plus-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"/></svg>
                    </div>
                </div>
            </div>
            <ul class="nav nav-tabs nav-tabs-wide">
                <li class="active"><a href="#wish" data-toggle="tab">아이템</a></li>
                <li><a href="#done" data-toggle="tab">완료</a></li>
            </ul>
        </div>
        <div class="tab-content">
            <!-- 아이템 목록 -->
            <div class="tab-pane active" id="wish">
                <ul class="ul-item">
                    <li v-for="item in wishItems" :key="item._id">
                        <item 
                        :item="item"
                        @onClick="handleClick" />
                    </li>
                </ul>
            </div>
            <!-- 완료 목록 -->
            <div class="tab-pane" id="done">
                <ul class="ul-item">
                     <li v-for="item in doneWishItems" :key="item._id">
                        <item 
                        :item="item"
                        @onClick="handleClick" />
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import store from '../../store';
const { getters, dispatch } = store;
import Item from './Item.vue';
export default {
    name: 'ItemList',
    components: {
        'item' : Item
    },
    computed:{
        items(){
            return getters.myAllItemList;
        },
        wishItems(){
            return getters.myItemList;
        },
        doneWishItems(){
            return getters.myDoneList;
        },
        wishTotal(){
            let total = 0;
            this.items.forEach(item => {
                if(item.itemPrice && item.purchasedBy == ''){
                    total += parseInt(item.itemPrice, 10);
                }
            });
            return total;
        },
        doneWishTotal(){
            let total = 0;
            this.items.forEach(item => {
                if(item.itemPrice && item.purchasedBy != ''){
                    total += parseInt(item.itemPrice, 10);
                }
            });
            return total;
        }
    },
    beforeRouteEnter(to, from, next){
        //비동기로 itemlist전부를 가져온다.
        dispatch('fetchMyAllItemList');
        //loading==false가 될 때 라우터 이동을 허용한다.
        store.watch(
            (state, getters) => state.loading,
            (newValue, oldValue) =>{
                if(newValue == false){
                    next();
                }
            }
        )
    },
    created(){
        // this.items = getters.myAllItemList;
    },
    methods:{
        onInsert(){
            this.$router.push({name:'itemInsert'})
        },
        handleClick(item){
            this.$router.push({name:'itemDetail', params:{itemId: item._id}});
        },
        openNav(){
            document.getElementById("mySidenav").style.width = "20rem";
            setTimeout(function(){
                document.getElementById("mySidenav").children[1].children[0].style.color="black"
                document.getElementById("mySidenav").children[1].children[1].style.color="black"
                document.getElementById("mySidenav").children[1].children[2].style.color="gray"
                document.getElementById("mySidenav").children[2].children[0].style.color="black"
                document.getElementById("mySidenav").children[2].children[1].style.color="black"
                document.getElementById("mySidenav").children[2].children[2].style.color="gray"
            }, 200)
            
        },
        closeNav(){
            document.getElementById("mySidenav").style.width = "0";
            setTimeout(function(){
                document.getElementById("mySidenav").children[1].children[0].style.color="transparent"
                document.getElementById("mySidenav").children[1].children[1].style.color="transparent"
                document.getElementById("mySidenav").children[1].children[2].style.color="transparent"
                document.getElementById("mySidenav").children[2].children[0].style.color="transparent"
                document.getElementById("mySidenav").children[2].children[1].style.color="transparent"
                document.getElementById("mySidenav").children[2].children[2].style.color="transparent"
            },50)
            
        }
    }
}
</script>
<style lang="scss" scoped>
    @import '@/styles/utils.scss';
    @import url('/assets/KoPubDotum.min.css');
    .view{
        background: white;
        height: 100%;
        overflow: hidden;
        font-family: $font-stack;
    }
    .fix-top{
        position: fixed;
        width: 100%;
        background: white;
        z-index: 4;
    }
    .header{
        display: flex;
        align-items: center;
        background: white;
        padding: 0.2rem 1.7rem 0 1.7rem;
        height: 5rem;
        box-shadow: 0px 3px 6px lightgray;
        z-index: 3;
    }
    .nav{
        flex:1;
        padding-top: 0.2rem;
    }
    .title{
        flex:1;
        text-align: center;
        font-weight: bolder;
        font-size: 1.6rem;
    }
    .add-button{
        @include flex-center();
        align-items: center;
        flex-direction: row;
        flex:1;
        justify-content: flex-end;
        font-size: 1rem;
        cursor: pointer;
        .add-text{
            font-size: 1.4rem;
            margin-right: 5px;
            color: #3a404a;
        }
        .plus-button{
            border-radius: 100%;
            width:2rem;
            height:2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0px 3px 5px lightgray;
            margin-left: 0.2rem;
            fill: #999ca3;
        }
    }
    .nav-tabs>li.active>a, .nav-tabs>li.active>a:focus, .nav-tabs>li.active>a:hover {
        color: #555;
        cursor: default;
    }
    .nav-tabs>li.active>a, .nav-tabs>li.active>a:focus, .nav-tabs>li.active>a:hover {
        background-color: transparent;
        border: none;
        border-bottom: 1px solid #555;
    }
    .nav-tabs-wide{
        width: 100%;
        border: none;
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 6rem;
        padding: 0 1.5rem 0 1.5rem;
        li{
            border: none;
            width: 100%;
            text-align: center;
            border-bottom: 1px solid #E7E7EB;
            
        }
        a{
            color: black;
            padding: 1rem 1rem 1.5rem 1rem;
        }
    }
    .ul-item{
        margin-top: 10rem;
        margin-bottom: 10rem;
        padding: 0 1.5rem 0 1.5rem;
        li{
            list-style: none;
        }
    }
    /* The side navigation menu */
    .sidenav {
    height: 100%; /* 100% Full-height */
    width: 0; /* 0 width - change this with JavaScript */
    position: fixed; /* Stay in place */
    z-index: 10; /* Stay on top */
    top: 0; /* Stay at the top */
    left: 0;
    background-color: #fff; /* Black*/
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 60px; /* Place content 60px from the top */
    transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
    }

    /* Position and style the close button (top right corner) */
    .sidenav .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
    padding-left: 5rem;
    }
    
    /* Style page content - use this if you want to push the page content to the right when you open the side navigation */
    #main {
    transition: margin-left .5s;
    padding: 20px;
    }

    /* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
    @media screen and (max-height: 450px) {
    .sidenav {padding-top: 15px;}
    .sidenav a {font-size: 18px;}
    }
    @media (min-width:420px){
        .fix-top{
            width: 50rem;
        }
        .header{
            height: 6rem;
            padding: 0 1.5rem 0 1.5rem;
        }
        .title{
            font-size: 2rem;
        }
        .nav-tabs-wide{
            font-size: 1.5rem;
        }
        .add-button .add-text{
            font-size: 1.7rem;
        }
    }
</style>