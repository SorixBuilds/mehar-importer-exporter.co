migrate((app) => {
 let catalogue;
 try { catalogue = app.findCollectionByNameOrId('produce_catalogue'); } catch (_) {
 catalogue = new Collection({name:'produce_catalogue',type:'base',listRule:'',viewRule:'',createRule:null,updateRule:null,deleteRule:null,fields:[{name:'title',type:'text',required:true},{name:'slug',type:'text',required:true},{name:'category',type:'text',required:true},{name:'image',type:'text'},{name:'description',type:'text'},{name:'position',type:'number'},{name:'created',type:'autodate',onCreate:true,onUpdate:false},{name:'updated',type:'autodate',onCreate:true,onUpdate:true}]}); app.save(catalogue);
 }
 const rows = [
 ['Fresh Red Onions','fresh-red-onions','Fresh Onions','4fb668e2-5380-44ad-87b5-38bff70b3470','Red onions bring a rich colour and a distinctive savoury flavour to everyday cooking. Discuss your kitchen, distribution or wholesale requirements with our team.'],
 ['Fresh White Onions','fresh-white-onions','Fresh Onions','6be0d313-032b-46e9-b086-4d00644d76a1','White onions are a versatile ingredient for food preparation and fresh produce distribution. Contact us to discuss the specifications that suit your market.'],
 ['Fresh Potatoes','fresh-potatoes','Fresh Potatoes','749df7bc-3952-4ba1-8841-52be2570d173','A kitchen staple for a wide range of dishes and food-service requirements. Let us know your preferred variety, pack size and intended use when requesting a quotation.'],
 ['Fresh Garlic Bulbs','fresh-garlic-bulbs','Fresh Garlic','4fa6665d-498b-4469-9780-e8c23eacb15f','Whole garlic bulbs for aromatic cooking and produce trade enquiries. Share your preferred bulb size, packaging and volume so we can discuss suitable supply.'],
 ['Fresh Ginger Roots','fresh-ginger-roots','Fresh Ginger','34699217-d33c-480a-9f5a-350b43f2d6ce','Fresh ginger roots with a warm, aromatic character for cooking and food preparation. Enquire about your required volume and delivery destination.'],
 ['Fresh Mangoes','fresh-mangoes','Fresh Mangoes','57c976c7-9739-4624-b684-97cf9b117153','Mangoes for fruit buyers, distributors and wholesale enquiries. Variety, ripeness, seasonal availability and packing arrangements are discussed for each enquiry.'],
 ['Fresh Pakistani Kinnow','fresh-pakistani-kinnow','Fresh Kinnow','b393e74b-b158-4e69-bcf3-e78619ed41b5','Kinnow citrus for fruit and wholesale enquiries. This is a sample product name, not confirmation of shipment origin. Ask our team to confirm origin and current availability.'],
 ['Fresh Mandarin Oranges','fresh-mandarin-oranges','Fresh Mandarin Oranges','50a9fc40-4124-48e0-b3c6-5eebd4f425c4','Mandarin oranges for fresh fruit buyers and distribution enquiries. Share your quantity, packaging needs and destination to request product-specific details.']
 ];
 rows.forEach((row,i) => { if (app.findRecordsByFilter(catalogue.name,'slug = {:slug}','',1,0,{slug:row[1]}).length) return; const r = new Record(catalogue); r.set('title',row[0]);r.set('slug',row[1]);r.set('category',row[2]);r.set('image','https://images.hostinger.com/43897551-32d2-4715-a959-ad4b4461a0d5/'+row[3]+'.png');r.set('description',row[4]);r.set('position',i);app.save(r); });
 let enquiries;
 try { enquiries = app.findCollectionByNameOrId('trade_enquiries'); } catch (_) {
 enquiries = new Collection({name:'trade_enquiries',type:'base',listRule:null,viewRule:null,createRule:'',updateRule:null,deleteRule:null,fields:[{name:'name',type:'text',required:true,max:160},{name:'email',type:'email',required:true},{name:'phone',type:'text',max:80},{name:'company',type:'text',max:200},{name:'product',type:'text',max:200},{name:'quantity',type:'text',max:200},{name:'destination',type:'text',max:300},{name:'message',type:'text',required:true,max:5000},{name:'consent',type:'bool',required:true},{name:'created',type:'autodate',onCreate:true,onUpdate:false},{name:'updated',type:'autodate',onCreate:true,onUpdate:true}]});app.save(enquiries);
 }
}, (app) => { app.delete(app.findCollectionByNameOrId('trade_enquiries'));app.delete(app.findCollectionByNameOrId('produce_catalogue')); });
