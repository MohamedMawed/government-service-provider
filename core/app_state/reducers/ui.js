export class CoreUIReducer {
  constructor() {
  }

  reduce(state = {pageLoading : false}, action) {
    switch (action.type) {
      case CoreUIReducer.PAGE_LOADING:
        return {
          ...state,
          pageLoading: !state.pageLoading,
        };
      case CoreUIReducer.PAGE_LOADING_ON:
        return {
          ...state,
          pageLoading: true,
        };
      case CoreUIReducer.PAGE_LOADING_OFF:
        return {
          ...state,
          pageLoading: false,
        };


      case CoreUIReducer.SHOW_CHAT_HEAD:
        return {
          ...state,
          chatHeadOpen: true,
        };
      case CoreUIReducer.CLOSE_CHAT_HEAD:
        return {
          ...state,
          chatHeadOpen: false,
        };
      case CoreUIReducer.COVER_LOADING:
        return {
          ...state,
          coverLoading: !state.coverLoading,
        };
      case CoreUIReducer.COVER_LOADING_ON:
        return {
          ...state,
          coverLoading: true,
        };
      case CoreUIReducer.COVER_LOADING_OFF:
        return {
          ...state,
          coverLoading: false,
        };
      default:
        return state;
    }
  }

  static PAGE_LOADING = 'PAGE_LOADING';
  static PAGE_LOADING_OFF = 'PAGE_LOADING_OFF';
  static PAGE_LOADING_ON = 'PAGE_LOADING_ON';
  static COVER_LOADING = 'COVER_LOADING';
  static COVER_LOADING_OFF = 'COVER_LOADING_OFF';
  static COVER_LOADING_ON = 'COVER_LOADING_ON';

  static SHOW_CHAT_HEAD = 'SHOW_CHAT_HEAD';
  static CLOSE_CHAT_HEAD = 'CLOSE_CHAT_HEAD';


  static turnOffPageLoading = () => {
    return {
      type: CoreUIReducer.PAGE_LOADING_OFF,
    };
  }

  static turnOnChatHead = () => {
    return {
      type: CoreUIReducer.SHOW_CHAT_HEAD,
    };
  }

  static turnOFFChatHead = () => {
    return {
      type: CoreUIReducer.CLOSE_CHAT_HEAD,
    };
  }

  static turnOnPageLoading = () => {
    return {
      type: CoreUIReducer.PAGE_LOADING_ON,
    };
  }

  static toggleCoverLoading = () => {
    return {
      type: CoreUIReducer.COVER_LOADING,
    };
  }

  static turnOffCoverLoading = () => {
    return {
      type: CoreUIReducer.COVER_LOADING_OFF,
    };
  }

  static turnOnCoverLoading = () => {
    return {
      type: CoreUIReducer.COVER_LOADING_ON,
    };
  }
}
