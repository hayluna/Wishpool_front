<template>
     <div class="view">
        <div class="header">
            <div class="nav">
                <div class="back" @click="onBack">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14.71 15.88L10.83 12l3.88-3.88c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L8.71 11.3c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0 .38-.39.39-1.03 0-1.42z"/></svg>
                </div>
            </div>
            <div class="empty"></div>
            <div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg></div>
        </div>
        <div class="contents">
            <div class="thumbnail" v-if="preview">
                <img :src="preview" @error="imgLoadError" />
            </div>
        </div>
    </div>
</template>
<script>
import store from '../../store';
const { getters } = store;
export default {
    name: 'ItemDetail',
    beforeRouteEnter(to, from, next){
        next(vm => {
                vm.item = getters.myAllItemList.find(item=>item._id == to.params.itemId);
                console.log(vm.item);
                vm.preview = vm.item.itemImgPath;
            });

    },
    data(){
        return{
            item: {},
            thumbnail:'',
            preview:'',
        }
    },
    methods:{
        imgLoadError(){
            this.item.itemImgPath='/assets/images/data_usage.svg';
        },
        onBack(){
            this.$router.go(-1);
        },
    }
}
</script>
<style lang="scss" scoped>
    @import '@/styles/utils.scss';
    .view{
        background: white;
        height: 100%;
    }
    .header{
        display: flex;
        align-items: center;
        justify-content: center;
        background: white;
        padding: 0 1rem 0 1rem;
        height: 5rem;
        box-shadow: 0px 3px 6px lightgray;
        position:fixed;
        width: 100%;
        z-index: 3;
    }
    .nav{
        justify-self: flex-start;
        flex:1;
    }
    .back{
        border: 1px solid $dark-gray;
        border-radius: 5px;
        width: 2.5rem;
        height: 2.5rem;
    }
    .title{
        text-align: center;
        font-weight: bolder;
        font-size: 1.6rem;
        flex:1
    }
    .empty{
        flex:1;
    }
    .contents{
        padding: 3rem;
        font-size: 2rem;
    }
    .thumbnail{
        width: 70%;
        height: 70%;
        margin-top: 2rem;
        border-radius: 5px;
        text-align: right;
        padding: 0.2rem;
        border: 1px solid lightgray;
        img{
            width:100%;
            height:100%;
        }
       
        svg{
            width: 2rem;
        }
    }
</style>