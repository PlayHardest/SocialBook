import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import '../lib/collections.js';

Template.profiles.helpers({//template helpers put data into the template
	profAll(){
		return userDB.find({});
	}
});

Template.profiles.events({//template events define and customize user interactions(events) within the template
	'click .js-like'(event, instance) {
		var __id=this._id;
 		var _likes= userDB.findOne({'_id':__id}).Likes;
 		if(!_likes){
 			_likes=0;
 		}
 		_likes++;
 		userDB.update({"_id":__id}, {$set:{'Likes':_likes}});
  	},
  	'click .js-dislike'(event, instance) {
		var __id=this._id;
 		var _dislikes= userDB.findOne({'_id':__id}).Dislikes;
 		if(!_dislikes){
 			_dislikes=0;
 		}
 		_dislikes++;
 		userDB.update({"_id":__id}, {$set:{'Dislikes':_dislikes}});
  	},
  	'click .js-delete'(event,instance) {
  		var profID = this._id;
  		$("#" + profID).fadeOut("slow","swing",function(){
  			userDB.remove({_id:profID}); 	
  		});
  	},

  	'click .js-saveEdits'(event, instance) {
  		var modalname = '#editModal' + this._id
		var fname = $(modalname + ' input[name="firstName"]').val()
		var lname = $(modalname + ' input[name="lastName"]').val()
		var img = $(modalname + ' input[name="Image1"]').val()
		var img2 = $(modalname + ' input[name="Image2"]').val()
		if(img ==""){
			img=userDB.findOne({'_id':this._id}).Image1;
		}
		if(img2 ==""){
			img2=userDB.findOne({'_id':this._id}).Image2;
		}
		if(fname ==""){
			fname=userDB.findOne({'_id':this._id}).firstName;
		}
		if(lname ==""){
			lname=userDB.findOne({'_id':this._id}).lastName;
		}
		$(modalname + ' input[name="firstName"]').val('')
		$(modalname + ' input[name="lastName"]').val('')
		$(modalname + ' input[name="Image1"]').val('')
		$(modalname + ' input[name="Image2"]').val('')
		$(modalname).modal('hide');
		userDB.update({"_id":this._id}, {$set:{'firstName':fname, 'lastName':lname, 'Image1':img, 'Image2':img2}});
	},
});

Template.addUser.events({
	'click .js-save'(event, instance) {
		var fname = $('#exampleModal input[name="firstName"]').val()
		var lname = $('#exampleModal input[name="lastName"]').val()
		var img = $('#exampleModal input[name="Image1"]').val()
		if(img ==""){
			img="rock.png"
		}
		var img2 = $('#exampleModal input[name="Image2"]').val()
		if(img2 ==""){
			img2="rock.png"
		}
		$('#exampleModal input[name="firstName"]').val('')
		$('#exampleModal input[name="lastName"]').val('')
		$('#exampleModal input[name="Image1"]').val('')
		$('#exampleModal input[name="Image2"]').val('')
		$('#exampleModal').modal('hide');
		userDB.insert({'firstName':fname, 'lastName':lname, 'Image1':img, 'Image2':img2, 'Likes':0, 'Dislikes':0 });
	},
}); 