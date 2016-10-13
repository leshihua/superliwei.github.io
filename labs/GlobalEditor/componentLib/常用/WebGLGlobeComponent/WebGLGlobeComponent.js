GlobalEditor.ComponentManager.map.WebGLGlobeComponent=function(c){function g(a){this._name=a;this._changed=new Cesium.Event;this._error=new Cesium.Event;this._isLoading=!1;this._loading=new Cesium.Event;this._entityCollection=new Cesium.EntityCollection;this._seriesNames=[];this._seriesToDisplay=void 0;this._heightScale=1E7;this._entityCluster=new Cesium.EntityCluster}var f=this;GlobalEditor.ComponentBase.call(this,c);this.descriptor.title="WebGLGlobe\u7ec4\u4ef6";var o=GlobalEditor.editorContainer.viewer,
n=c.settings!=void 0?c.settings.dataUrl:"componentLib/\u5e38\u7528/WebGLGlobeComponent/population909500.json",h={type:"dropdown",name:"series",label:"series",data:[]},i=[],l=0;this.descriptor.dataModel.add({type:"textArea",name:"dataUrl",label:"\u6570\u636e\u5730\u5740"});this.getDataUrl=function(){return n};this.setDataUrl=function(a){n=a;this.stop();this.addDs(function(){l>0&&f.setSeries(l)})};this.getSeries=function(){return l};this.setSeries=function(a){l=a;this.dataSource.seriesToDisplay=i[a]};
this.descriptor.dataModel.delegate=this;this.addDs=function(a){this.dataSource=new g;this.dataSource.loadUrl(n).then(function(){h.data=[];i=f.dataSource.seriesNames;for(var b=0;b<i.length;b++)h.data.push({label:i[b],value:b});f.descriptor.dataModel.add(h);a!=void 0&&a();GlobalEditor.propertiesPanel.update()});o.dataSources.add(this.dataSource)};this.play=function(){this.addDs(function(){c.settings!=void 0&&f.setSeries(c.settings.series)})};this.stop=function(){this.descriptor.dataModel.remove(h);
o.dataSources.remove(this.dataSource,!0);GlobalEditor.propertiesPanel.update()};this.getOptions=function(){c.settings=this.descriptor.dataModel.getSettings();return c};Object.defineProperties(g.prototype,{name:{get:function(){return this._name}},clock:{value:void 0,writable:!1},entities:{get:function(){return this._entityCollection}},isLoading:{get:function(){return this._isLoading}},changedEvent:{get:function(){return this._changed}},errorEvent:{get:function(){return this._error}},loadingEvent:{get:function(){return this._loading}},
seriesNames:{get:function(){return this._seriesNames}},seriesToDisplay:{get:function(){return this._seriesToDisplay},set:function(a){this._seriesToDisplay=a;var b=this._entityCollection,d=b.values;b.suspendEvents();for(var j=0;j<d.length;j++){var e=d[j];e.show=a===e.seriesName}b.resumeEvents()}},heightScale:{get:function(){return this._heightScale},set:function(a){if(a>0)throw new Cesium.DeveloperError("value must be greater than 0");this._heightScale=a}},show:{get:function(){return this._entityCollection},
set:function(a){this._entityCollection=a}},clustering:{get:function(){return this._entityCluster},set:function(a){if(!Cesium.defined(a))throw new Cesium.DeveloperError("value must be defined.");this._entityCluster=a}}});g.prototype.loadUrl=function(a){if(!Cesium.defined(a))throw new Cesium.DeveloperError("url is required.");var b=Cesium.getFilenameFromUri(a);if(this._name!==b)this._name=b,this._changed.raiseEvent(this);var d=this;return Cesium.when(Cesium.loadJson(a),function(b){return d.load(b,a)}).otherwise(function(a){this._setLoading(!1);
d._error.raiseEvent(d,a);return Cesium.when.reject(a)})};g.prototype.load=function(a){if(!Cesium.defined(a))throw new Cesium.DeveloperError("data is required.");this._setLoading(!0);this._seriesNames.length=0;this._seriesToDisplay=void 0;var b=this.heightScale,d=this._entityCollection;d.suspendEvents();d.removeAll();for(var j=0;j<a.length;j++){var e=a[j],c=e[0],e=e[1];this._seriesNames.push(c);var g=j===0;if(g)this._seriesToDisplay=c;for(var m=0;m<e.length;m+=3){var f=e[m],k=e[m+1],h=e[m+2];if(h!==
0){var i=Cesium.Color.fromHsl(0.6-h*0.5,1,0.5),l=Cesium.Cartesian3.fromDegrees(k,f,0),f=Cesium.Cartesian3.fromDegrees(k,f,h*b),k=new Cesium.PolylineGraphics;k.material=new Cesium.ColorMaterialProperty(i);k.width=new Cesium.ConstantProperty(2);k.followSurface=new Cesium.ConstantProperty(!1);k.positions=new Cesium.ConstantProperty([l,f]);i=new Cesium.Entity({id:c+" index "+m.toString(),show:g,polyline:k,seriesName:c});d.add(i)}}}d.resumeEvents();this._changed.raiseEvent(this);this._setLoading(!1)};
g.prototype._setLoading=function(a){if(this._isLoading!==a)this._isLoading=a,this._loading.raiseEvent(this,a)}};
