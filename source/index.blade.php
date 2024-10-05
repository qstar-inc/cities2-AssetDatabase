@extends('_layouts.main')

@section('body')
    <div id="main-menu" class="splash-screen" style="display: flex;">
        <div>
            <div class="mainmenu-container">
                <img src="{{ $page->images }}/cities2/mainmenu.jpg" alt="Main Menu" class="mainmenu-bg">
            </div>
            <div class="mainmenu-layout">
                <div class="drop-shadow mainmenu-logo-container">
                    <img src="{{ $page->images }}/cities2/GameLogo.svg" alt="Cities: Skylines II" class="mainmenu-logo" />
                </div>
                <div class="mainmenu-center">
                    <div class="mainmenu-start">
                        <button class="mainmenu-start-button">
                            <div class="mainmenu-start-icon"></div>
                            <span class="mainmenu-start-text">ONE</span>
                        </button>
                        <button class="mainmenu-start-button">
                            <div class="mainmenu-start-icon"></div>
                            <span class="mainmenu-start-text">TWO</span>
                        </button>
                        <button class="mainmenu-start-button">
                            <div class="mainmenu-start-icon"></div>
                            <span class="mainmenu-start-text">THREE</span>
                        </button>
                        <button class="mainmenu-start-button">
                            <div class="mainmenu-start-icon"></div>
                            <span class="mainmenu-start-text">FOUR</span>
                        </button>
                        <button class="mainmenu-start-button">
                            <div class="mainmenu-start-icon"></div>
                            <span class="mainmenu-start-text">FIVE</span>
                        </button>
                        <button class="mainmenu-start-button">
                            <div class="mainmenu-start-icon"></div>
                            <span class="mainmenu-start-text">SIX</span>
                        </button>
                        {{-- <button class="mainmenu-start-button">
                            <div class="mainmenu-start-icon"></div>
                            <span class="mainmenu-start-text">SEVEN</span>
                        </button>
                        <button class="mainmenu-start-button">
                            <div class="mainmenu-start-icon"></div>
                            <span class="mainmenu-start-text">EIGHT</span>
                        </button> --}}
                    </div>
                    <div class="mainmenu-info">
                        <div class="mainmenu-info-header">
                            <span class="mainmenu-info-header-text">WORK-IN-PROGRESS</span>
                        </div>
                    </div>
                    <div class="mainmenu-notification"></div>
                </div>
                <div class="mainmenu-version">0.0.0 (Nothing Works Edition)</div>
                <div class="mainmenu-user"></div>
            </div>
            {{-- <div class="menu-ui_I8X menu-theme_k91">
                <div class="content-container_DDJ">
                    <div class="content_fc3">
                        <div class="master-screen_B69 base_D7z"><img class="logo_xOs child-opacity-transition_nkS" src="/assets/images/cities2/GameLogo.svg">
                            <div class="content_LhM">
                                <div class="column_y44"></div>
                                <div class="column_y44">
                                    <button class="button_uFa child-opacity-transition_nkS button_uFa child-opacity-transition_nkS">
                                        <div class="tinted-icon_iKo icon_zVk" style="mask-image: url(Media/Glyphs/ArrowRight.svg); "></div>
                                        <div class="label_NLv">Continue Game</div>
                                    </button><button class="button_uFa child-opacity-transition_nkS button_uFa child-opacity-transition_nkS">
                                        <div class="tinted-icon_iKo icon_zVk" style="mask-image: url(Media/Glyphs/Plus.svg); "></div>
                                        <div class="label_NLv">New Game</div>
                                    </button><button class="button_uFa child-opacity-transition_nkS button_uFa child-opacity-transition_nkS">
                                        <div class="tinted-icon_iKo icon_zVk" style="mask-image: url(Media/Glyphs/Progress.svg); "></div>
                                        <div class="label_NLv">Load Game</div>
                                    </button><button class="button_uFa child-opacity-transition_nkS button_uFa child-opacity-transition_nkS">
                                        <div class="tinted-icon_iKo icon_zVk" style="mask-image: url(Media/Glyphs/Pen.svg); "></div>
                                        <div class="label_NLv">
                                            <div class="button-label-left_YKT">Editor</div>
                                            <div class="button-label-right_ZdY">
                                                <div class="beta-pill_OSA">Beta</div>
                                            </div>
                                        </div>
                                    </button><button class="button_uFa child-opacity-transition_nkS button_uFa child-opacity-transition_nkS">
                                        <div class="tinted-icon_iKo icon_zVk" style="mask-image: url(Media/Glyphs/ParadoxMods.svg); "></div>
                                        <div class="label_NLv">
                                            <div class="button-label-left_YKT">Paradox Mods</div>
                                            <div class="button-label-right_ZdY">
                                                <div class="beta-pill_OSA">Beta</div>
                                            </div>
                                        </div>
                                    </button><button class="button_uFa child-opacity-transition_nkS button_uFa child-opacity-transition_nkS">
                                        <div class="tinted-icon_iKo icon_zVk" style="mask-image: url(Media/Glyphs/Gear.svg); "></div>
                                        <div class="label_NLv">Options</div>
                                    </button><button class="button_uFa child-opacity-transition_nkS button_uFa child-opacity-transition_nkS">
                                        <div class="tinted-icon_iKo icon_zVk" style="mask-image: url(Media/Glyphs/Credits.svg); "></div>
                                        <div class="label_NLv">Credits</div>
                                    </button><button class="button_uFa child-opacity-transition_nkS button_uFa child-opacity-transition_nkS">
                                        <div class="tinted-icon_iKo icon_zVk" style="mask-image: url(Media/Glyphs/Close.svg); "></div>
                                        <div class="label_NLv">Exit</div>
                                    </button>
                                </div>
                                <div class="column_y44">
                                    <div class="paradox-panel_iFS paradox-panel_t14 child-opacity-transition_nkS">
                                        <div class="header_MiJ">
                                            <div class="tinted-icon_iKo logo_opg" style="mask-image: url(Media/Menu/Paradox/ParadoxLogoNoText.svg); "></div>
                                            <div class="title_S09">Paradox Account</div>
                                        </div>
                                        <div class="content_VTM">
                                            <div class="user_LhQ">
                                                <div class="avatar-mask_EqN"><img class="avatar_rvW" src="https://modscreatorcontent.paradox-interactive.com/Qoushik/avatar/creator_avatar.jpg"></div>
                                                <div class="user-info_n0Q">
                                                    <div class="user-name_GiO">Qoushik</div>
                                                    <div class="user-name_GiO">q***@***m</div>
                                                </div>
                                            </div>
                                            <div class="button-container_sgE">
                                                <div class="button-row_LTO"><button class="button_WWa button_o5e">Logout</button></div>
                                                <div class="legal-row_qI2"><button class="legal-link_Cxy item-states_QjV">Terms of Use</button><button class="legal-link_Cxy item-states_QjV">Privacy
                                                        Policy</button></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="notifications-panel_AtV notifications-panel_c5F child-opacity-transition_nkS">
                                        <div class="header_JLb">Notifications</div>
                                        <div class="wrapper_x8D">
                                            <div class="scrollable_DXr y_SMM scrollable_aqz">
                                                <div class="content_gqa">
                                                    <div class="item-transition_kWi"><button class="item_tYE">
                                                            <div class="main-column_j77">
                                                                <div class="title_wMV">ACTION REQUIRED</div>
                                                                <div class="text__0z">PDX cloud data conflict detected</div>
                                                            </div>
                                                            <div class="progress-container_Trw">
                                                                <div class="progress-circle_lIZ progress-circle_OLN progress-circle_MKN"><svg class="image_AKd" viewbox="0 0 100 100">
                                                                        <path class="progress_EdA progress_mlv" d="M 50 2.5 A 47.5 47.5, 0, 0 1, 50 2.5" stroke-width="5"></path>
                                                                    </svg></div>
                                                                <div class="tinted-icon_iKo warning-icon_dBU progress-icon_KDy" style="mask-image: url(Media/Glyphs/Warning.svg); "></div>
                                                            </div>
                                                        </button></div>
                                                    <div class="item-transition_kWi"><button class="item_tYE">
                                                            <div class="main-column_j77">
                                                                <div class="title_wMV">Simple Mod Checker Plus</div>
                                                                <div class="text__0z">Loaded 10 mods.</div>
                                                            </div>
                                                        </button></div>
                                                    <div class="bottom-padding_JS3"></div>
                                                </div>
                                                <div class="track_e3O y_SMM">
                                                    <div class="thumb_Cib y_SMM"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="column_y44"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="version_VJt">1.1.8f1 (545.28683) [5564.26013]</div>
                <div class="corner_Uxw"><button class="user-switch-prompt_UJI user-switch-prompt_m_H"><img class="avatar_MH0" src="useravatar:///UserAvatar#0?size=Auto">
                        <div class="label_deh">qstar.inc</div>
                    </button></div>
            </div> --}}
        </div>
    </div>
@endsection
