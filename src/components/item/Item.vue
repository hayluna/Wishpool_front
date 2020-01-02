<template>
    <div class="item">
        <div class="thumb"></div>
        <div class="desc">
            <div class="text">
                <span class="name">{{ item.itemName | filterName }}</span>
                <span class="badge">{{ item.visibleTo | filterBadge }}</span>
            </div>
            <span class="price">{{ item.itemPrice | filterPrice }}원</span>
        </div>
        <svg @click="onOptionClick" data-toggle="popover" data-placement="left" data-content="공유|수정|완료" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
    </div>
</template>
<script>
export default {
    name: 'Item',
    props: ['item'],
    methods:{
        onOptionClick(){

        }
    },
    filters:{
        filterName(val){
            if(val.length >13){
                return val.substr(0, 13)+'...';
            }
            return val;
        },
        filterBadge(val){
            if(val == 'private'){
                return '비공개';
            }else if(val == 'public'){
                return '공개';
            }
        },
        filterPrice(val){
            if(val==null){
                return '-'
            }
            return val;
        }

    }
}
</script>
<style lang="scss" scoped>
    @import '@/styles/utils.scss';
.item{
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid lightgray;
    padding: 2rem 0.2rem 2rem 1.5rem;
}
.desc{
    flex:1;
    margin-top: 0.5rem;
    margin-left: 1.5rem;
    height: 100%;
    align-self: flex-start;
    font-weight: bold;
}
.thumb{
    width: 4.5rem;
    height: 4.5rem;
    justify-self: flex-start;
    border-radius: 15px;
    border: 1px solid #3e414b;
}
.badge{
    margin-left: 0.5rem;
    border: 1px solid #A9AAB9;
    border-radius: 8px;
    background: transparent;
    color: #A9AAB9;
    font-size: 0.8rem;
    padding-right: 0.4rem;
    padding-left: 0.4rem;
}
svg{
    justify-self: flex-end;
    fill: #BEBEBE;
    cursor: pointer;
}
.price{
    color: #A9AAB9;
    font-size: 1.2rem;
    font-weight: normal;
}
</style>