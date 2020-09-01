<?php
class Utilities {
    public function getPaging($page, $total_rows, $records_per_page, $page_url) {
        $paging_arr = array();

        // Buton for first page
        $paging_arr["first"] = $page > 1 ? "{$page_url}page=1" : "";

        // Count all products in the database to calculate total pages
        $total_pages = ceil($total_rows / $records_per_page);

        // Range of links to show
        $range = 2;

        // Display links to "range of pages" around "current page"
        $initial_num = $page - $range;
        $condition_limit_num = ($page + $range) + 1;

        $paging_arr["pages"] = array();
        $page_count = 0;

        for ($x = $initial_num; $x < $condition_limit_num; $x++) {
            if (($x > 0) && ($x <= $total_pages)) {
                $paging_arr["pages"][$page_count]["page"] = $x;
                $paging_arr["pages"][$page_count]["url"] = "{$page_url}page={$x}";
                $paging_arr["pages"][$page_count]["current_page"] = $x == $page ? "yes" : "no";

                $page_count++;
            }
        }

        // Button for last page
        $paging_arr["last"] = $page < $total_pages ? "{$page_url}page={$total_pages}" : "";

        return $paging_arr;
    }
}
?>
