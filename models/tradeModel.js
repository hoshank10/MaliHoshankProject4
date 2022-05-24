
const mongoose= require('mongoose');
const Schema= mongoose.Schema;

const categorySchema= new Schema({    
    catName:{type:String,required:[true,'Category Name is required']},
    bgImg:{type:String}   
});

const productSchema= new Schema({
    catName:{type:String,required:[true,'Category Name is required']}, 
    title:{type:String,required:[true,'Product Name is required']},
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    author_name: { type: String},
    sub_title:{type:String},
    Img:{type:String},
    Desc:{type:String},
    status: {type:String, default: "available"} 
});

const category = mongoose.model('Category',categorySchema);
const product = mongoose.model('Product',productSchema);
module.exports = {
    category, product
}

// const {v4: uuidv4, NIL} = require('uuid');

// const category = [
//     {
//         catid : '1',
//         catName : 'Figures',
//         bgImg : '/images/figure.jpg'
//     },
//     {
//         catid : '2',
//         catName : 'Manga',
//         bgImg : '/images/manga.jpg'
//     },
//     {
//         catid : '3',
//         catName : 'Hoodies',
//         bgImg : '/images/clothing.jpg'
//     }    
// ];

// const items = [
//     {
//         catid : '1',
//         id : '1',        
//         title : 'Kakashi and Naruto Figure',
//         sub_title : 'Naruto, Naruto Shippuden',        
//         Img : '/images/kakashi.png',
//         Desc : `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//         eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
//         ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//         aliquip ex ea commodo consequat.`
//     },
//     {
//         catid : '1',
//         id : '2',        
//         title : 'Luffy and Shanks Figure',
//         sub_title : 'Luffy and Shanks, One Piece',        
//         Img : '/images/LuffyShanksFig.jpeg',
//         Desc : `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//         eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
//         ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//         aliquip ex ea commodo consequat.`
//     },
//     {
//         catid : '1',
//         id : '3',
//         title : 'Goku Figure',
//         sub_title : 'Goku, Dragon Ball Super',        
//         Img : '/images/GokuFig.jpg',
//         Desc : `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//         eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
//         ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//         aliquip ex ea commodo consequat.`
//     },
//     {
//         catid : '2',
//         id : '4',        
//         title : 'Naruto Manga',
//         sub_title : 'Naruto',        
//         Img : '/images/NarutoManga.jpg',
        // Desc : `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        // eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
        // ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        // aliquip ex ea commodo consequat.`
//     },
//     {
//         catid : '2',
//         id : '5',
//         title : 'Death Note Manga',
//         sub_title : 'Death Note',        
//         Img : '/images/DeathNoteManga.jpg',
//         Desc : `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//         eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
//         ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//         aliquip ex ea commodo consequat.`
//     },
//     {
//         catid : '2',
//         id : '6',
//         title : 'Attack on Titan Manga',
//         sub_title : 'Attack on Titan',        
//         Img : '/images/AOTManga.jpg',
//         Desc : `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//         eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
//         ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//         aliquip ex ea commodo consequat.`
//     },
//     {
//         catid : '3',
//         id : '7',
//         title : 'Zenitsu Hoodie',
//         sub_title : 'Zenitsu, Demon Slayer',        
//         Img : '/images/ZenitsuHoodie.png',
//         Desc : `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//         eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
//         ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//         aliquip ex ea commodo consequat.`
//     },
//     {
//         catid : '3',
//         id : '8',
//         title : 'Gojo and Itadori Hoodie',
//         sub_title : 'Satoru Gojo  & Itadori Yuji, Jujutsu Kaisen',        
//         Img : '/images/GojoHoodie.jpg',
//         Desc : `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//         eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
//         ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//         aliquip ex ea commodo consequat.`
//     },
//     {
//         catid : '3',
//         id : '9',
//         title : 'Zoro Hoodie',
//         sub_title : 'Roronoa Zoro and Dracule Mihawk, One Piece',        
//         Img : '/images/ZoroHoodie.jpg',
//         Desc : `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//         eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
//         ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//         aliquip ex ea commodo consequat.`
//     }
// ];

// exports.findCat = function(){ 
//     let resultArr=[]
//     category.forEach(cat=>{
//        let temp= items.filter(obj=>{
//                 return obj.catid==cat.catid
//         })
//         cat.products=temp
//         resultArr.push(cat)
//     })      
//     return resultArr;    
// };

// exports.findCatByItemId = function(id){    
//     let temp = category.find(cat=> cat.catid == id);
//     return temp;
// }

// exports.findItemById = function(id){
//     return items.find(story=> story.id === id);
// };

// exports.findAllCat = function(){
//     return category;
// };

// exports.save = function (item) {   

//     let result= category.find(obj=>{
//         return obj.catName == item.Category
//     })
        
//     if(result==undefined){
//         let tempobj={}
//         tempobj.catName=item.Category;
//         tempobj.catid=uuidv4();
//         if(item.Category_Img==''){
//             tempobj.bgImg="/images/manga.jpg";
//         }else{
//             tempobj.bgImg=item.Category_Img;
//         }
//         console.log(item);
//         category.push(tempobj);
        
//         let tempobj1 = {}
//         tempobj1.catid = tempobj.catid;
//         tempobj1.id = uuidv4();        
//         tempobj1.title = item.title;
//         tempobj1.sub_title = item.sub_title;
//         tempobj1.Img = item.Product_Img;
//         tempobj1.Desc = item.Desc;
//         items.push(tempobj1);
//         return true;
//     }else{
//         let tempobj1 = {}
//         tempobj1.catid = result.catid;
//         tempobj1.id = uuidv4();        
//         tempobj1.title = item.title;
//         tempobj1.sub_title = item.sub_title;
//         tempobj1.Img = item.Product_Img;
//         tempobj1.Desc = item.Desc;
//         items.push(tempobj1);
//         return true;
//     }
// }

// exports.updateById=function(id,newStory){
//     let result= category.find(obj=>{
//         return obj.catName == newStory.Category
//     })

//     let story = items.find(story=> story.id === id);
        
//     if(result==undefined){
//         let tempobj={}
//         tempobj.catName=newStory.Category;
//         tempobj.catid=uuidv4();
//         if(newStory.Category_Img==''){
//             tempobj.bgImg="/images/manga.jpg";
//         }else{
//             tempobj.bgImg=newStory.Category_Img;
//         }        
//         category.push(tempobj);
                
//         story.catid = tempobj.catid;             
//         story.title = newStory.title;
//         story.sub_title = newStory.sub_title;
//         story.Img = newStory.Product_Img;
//         story.Desc = newStory.Desc;        
//         return true;
//     }else{
//         story.catid = result.catid;             
//         story.title = newStory.title;
//         story.sub_title = newStory.sub_title;
//         story.Img = newStory.Product_Img;
//         story.Desc = newStory.Desc; 
//         return true;
//     }    
// }

// exports.deleteById = function(id){
//     let index = items.findIndex(story => story.id === id);
//     if (index != -1){
//         items.splice(index,1);
//         return true;
//     }else{
//         return false;
//     }
// }

// exports.deleteCatByName = function(cat){
//     let index = category.find(obj =>{
//         return obj.catName == cat
//     })    
//     let indexcat = category.findIndex(obj =>{
//         return obj.catid == index.catid;
//     })      
//     if (indexcat != -1){
//         category.splice(indexcat,1);
//         for(var i=0; i<items.length; i++){
//             if(items[i].catid == index.catid){
//                 items.splice(i,1);
//             }
//         } 
//         return true;
//     }else{
//         return false;
//     }
// }