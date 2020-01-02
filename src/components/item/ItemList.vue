<template>
    <div class="view">
        <div class="fix-top">
            <div class="header">
                <div class="nav">
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
                        :item="item" />
                    </li>
                </ul>
            </div>
            <!-- 완료 목록 -->
            <div class="tab-pane" id="done">
                <ul class="ul-item">
                     <li v-for="item in doneWishItems" :key="item._id">
                        <item 
                        :item="item" />
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
    data(){
        return{
            items: []
        }
    },
    computed:{
        wishItems(){
            var items = this.items.filter(item => item.purchasedBy == '');
            return items;
        },
        doneWishItems(){
            var items = this.items.filter(item => item.purchasedBy != '');
            return items;
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
        this.items = getters.myAllItemList;
    },
    methods:{
        onInsert(){
            this.$router.push({name:'itemInsert'})
        }
    }
}
</script>
<style lang="scss" scoped>
    @import '@/styles/utils.scss';
    .view{
        background: white;
        height: 100%;
        overflow: hidden;
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
        padding: 0 1rem 0 1rem;
        height: 5rem;
        box-shadow: 0px 3px 6px lightgray;
        z-index: 3;
    }
    .nav{
        flex:1;
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
        padding: 0 1.5rem 0 1.5rem;
        li{
            list-style: none;
        }
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