package borman.aroundthehorn.dao;

import borman.aroundthehorn.dao.rowmappers.RoomRowMapper;
import borman.aroundthehorn.models.Room;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RoomDao {

    private final JdbcTemplate jdbcTemplate;

    public RoomDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Room> fetchAllRooms() {
        return jdbcTemplate.query("SELECT * FROM rooms", new RoomRowMapper());
    }

}