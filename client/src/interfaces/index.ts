export interface Action {
    type:string;
    payload:{
        id:number;
    }
    
}


export interface State {
    auth:{
        isSignedIn:boolean | null;
        userId:number | null;
    }
    streams: (StreamState)[];

 }

export interface MyProps {
    deleteStream(id:number):void;
    editStream(id:number,formValues:FormValues):void;
    fetchStream(id:number):void;
    match:{
        params:{
            id:number;
        }
    }
    stream:StreamState;
    videoRef:any;
}

export interface FormValues {
    title?:string; 
    description?:string;
}

export interface StreamState {
    title: string;
    description: string;
    id: number;
    userId:number;
  }
  

export interface FormProps {
    input: {
        name:string;
        onBlur():void;
        onChange():void;
        onDragStart():void;
        onDrop():void;
        onFocus():void;
        value:string;
    }
    meta:Meta;
    label:string;
    
}
 export interface Meta {
    error:{}
    touched:boolean;
}

