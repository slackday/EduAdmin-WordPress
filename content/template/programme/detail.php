<?php
ob_start();
$show_headers = EDU()->is_checked( 'eduadmin-showDetailHeaders', true );
if ( ! EDU()->api_connection ) {
	echo esc_html_x( 'EduAdmin Booking could not connect to the API', 'frontend', 'eduadmin-booking' );
} else {
	?>
	<div class="eduadmin" data-courseid="<?php echo esc_attr( $programme['ProgrammeId'] ); ?>"
	     data-eventid="<?php echo( isset( $_REQUEST['id'] ) ? esc_attr( sanitize_text_field( $_REQUEST['id'] ) ) : '' ); ?>">
		<?php if ( ! empty( $programme['ImageUrl'] ) ) : ?>
			<img src="<?php echo esc_url( $programme['ImageUrl'] ); ?>" class="courseImage" />
		<?php endif; ?>
		<h1 class="courseTitle"><?php echo esc_html( $programme['ProgrammeName'] ); ?></h1>
		<?php if ( ! empty( $programme['Description'] ) ) : ?><?php if ( $show_headers ) { ?>
			<h2><?php echo esc_html_x( 'Description', 'frontend', 'eduadmin-booking' ); ?></h2>
		<?php } ?><?php echo wp_kses_post( $programme['Description'] ); ?><?php endif; ?>
		<?php if ( ! empty( $programme['Prerequisites'] ) ) : ?><?php if ( $show_headers ) { ?>
			<h2><?php echo esc_html_x( 'Prerequisites', 'frontend', 'eduadmin-booking' ); ?></h2>
		<?php } ?><?php echo wp_kses_post( $programme['Prerequisites'] ); ?><?php endif; ?>
		<?php if ( ! empty( $programme['TargetGroup'] ) ) : ?><?php if ( $show_headers ) { ?>
			<h2><?php echo esc_html_x( 'Target Group', 'frontend', 'eduadmin-booking' ); ?></h2>
		<?php } ?><?php echo wp_kses_post( $programme['TargetGroup'] ); ?><?php endif; ?>
		<?php if ( ! empty( $programme['Courses'] ) ) : ?><?php if ( $show_headers ) { ?>
			<h2><?php echo esc_html_x( 'Modules', 'frontend', 'eduadmin-booking' ); ?></h2>
		<?php } ?>
			<ul>
				<?php
				foreach ( $programme['Courses'] as $module ) {
					// TODO: Add link to course template page
					echo '<li>' . esc_html( $module['CourseName'] ) . '</li>';
				}
				?>
			</ul>
		<?php
		endif;
		?>
		<h2><?php echo esc_html_x( 'Programme starts', 'frontend', 'eduadmin-booking' ); ?></h2>
		<?php
		if ( ! empty( $programme['ProgrammeStarts'] ) ) {
			include_once 'template/detail-list.php';
		} else {
			echo '<i>' . esc_html_x( 'No programme starts available', 'frontend', 'eduadmin-booking' ) . '</i>';
		}

		do_action( 'eduadmin-programme-detail-view', $programme );
		?>
	</div>
	<?php
}

$out = ob_get_clean();

return $out;