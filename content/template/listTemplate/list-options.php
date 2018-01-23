<?php
	$allowLocationSearch = get_option( 'eduadmin-allowLocationSearch', true );
	$allowSubjectSearch  = get_option( 'eduadmin-allowSubjectSearch', false );
	$allowCategorySearch = get_option( 'eduadmin-allowCategorySearch', false );
	$allowLevelSearch    = get_option( 'eduadmin-allowLevelSearch', false );

	$showSearch      = $attributes['showsearch'];
	$showMoreNumber  = $attributes['showmore'];
	$showCity        = $attributes['showcity'];
	$showBookBtn     = $attributes['showbookbtn'];
	$showReadMoreBtn = $attributes['showreadmorebtn'];

	$searchVisible = $showSearch == true || ( $attributes['hidesearch'] == false || $attributes['hidesearch'] == null );

	$subjects = get_transient( 'eduadmin-subjects' );
	if ( ! $subjects ) {
		$sorting = new XSorting();
		$s       = new XSort( 'SubjectName', 'ASC' );
		$sorting->AddItem( $s );
		$subjects = EDU()->api->GetEducationSubject( $edutoken, $sorting->ToString(), '' );
		set_transient( 'eduadmin-subjects', $subjects, DAY_IN_SECONDS );
	}

	$distinctSubjects = array();
	foreach ( $subjects as $subj ) {
		if ( ! key_exists( $subj->SubjectID, $distinctSubjects ) ) {
			$distinctSubjects[ $subj->SubjectID ] = $subj->SubjectName;
		}
	}

	$addresses = get_transient( 'eduadmin-locations' );
	if ( ! $addresses ) {
		$ft = new XFiltering();
		$f  = new XFilter( 'PublicLocation', '=', 'true' );
		$ft->AddItem( $f );
		$addresses = EDU()->api->GetLocation( $edutoken, '', $ft->ToString() );
		set_transient( 'eduadmin-locations', $addresses, DAY_IN_SECONDS );
	}

	$showEvents = get_option( 'eduadmin-showEventsInList', false );

	$categories = get_transient( 'eduadmin-categories' );
	if ( ! $categories ) {
		$ft = new XFiltering();
		$f  = new XFilter( 'ShowOnWeb', '=', 'true' );
		$ft->AddItem( $f );
		$categories = EDU()->api->GetCategory( $edutoken, '', $ft->ToString() );
		set_transient( 'eduadmin-categories', $categories, DAY_IN_SECONDS );
	}

	$levels = get_transient( 'eduadmin-levels' );
	if ( ! $levels ) {
		$levels = EDU()->api->GetEducationLevel( $edutoken, '', '' );
		set_transient( 'eduadmin-levels', $levels, DAY_IN_SECONDS );
	}

	$courseLevels = get_transient( 'eduadmin-courseLevels' );
	if ( ! $courseLevels ) {
		$courseLevels = EDU()->api->GetEducationLevelObject( $edutoken, '', '' );
		set_transient( 'eduadmin-courseLevels', $courseLevels, DAY_IN_SECONDS );
	}